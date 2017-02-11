'use strict';


const Promise = require('bluebird');
const crypto = require('crypto');
const querystring = require('querystring');
const fetch = require('node-fetch');


const LASTFM_API = 'http://ws.audioscrobbler.com/2.0';


const makeHash = input =>
  crypto.createHash('md5').update(input, 'utf8').digest('hex');


const post = body => Promise.resolve(fetch(LASTFM_API, {method: 'POST', body}))
  .then(res => res.json())
  .then(json => {
    if (json.error) {
      return Promise.reject(new Error(json.message))
    }
    return json;
  });


const LastFm = function ({LASTFM_API_KEY, LASTFM_SECRET, LASTFM_USER, LASTFM_PASSWORD}) {
  this.apiKey = LASTFM_API_KEY;
  this.apiSecret = LASTFM_SECRET;
  this.username = LASTFM_USER;
  this.password = LASTFM_PASSWORD;
  this.sessionKey = null
};


LastFm.prototype.love = function ({artist, album = '_', track}) {
  return this.prepareData({method: 'track.love', artist, album, track})
    .then(post);
};


LastFm.prototype.unlove = function ({artist, album = '_', track}) {
  return this.prepareData({method: 'track.unlove', artist, album, track})
    .then(post);
};


const ALMOST_TWO_WEEKS = 14 * 24 * 3600 * 1000 - 3600 * 1000;


LastFm.prototype.scrobble = function ({artist, album = '_', track, lastPlayed}) {
  const timestamp = Math.floor(Math.max(lastPlayed, Date.now() - ALMOST_TWO_WEEKS) / 1000);

  return this.prepareData({method: 'track.scrobble', artist, album, track, timestamp})
    .then(post)
};


LastFm.prototype.makeSig = function (params) {
  return makeHash(Object.keys(params).sort()
    .reduce((result, key) =>
      `${params[key]}`.length > 0 ?
        result.concat(key).concat(`${params[key]}`) :
        result, '')
    .concat(this.apiSecret));
};


LastFm.prototype.getSessionKey = function () {
  if (this.sessionKey) {
    return Promise.resolve(this.sessionKey);
  }

  const params = {
    method: 'auth.getMobileSession',
    username: this.username,
    authToken: makeHash(`${this.username}${makeHash(this.password)}`),
    api_key: this.apiKey
  };
  const data = querystring.stringify(Object.assign(params, {
    api_sig: this.makeSig(params),
    format: 'json'
  }));

  return Promise.resolve(fetch(`${LASTFM_API}?${data}`))
    .then(res => res.json())
    .then(json => {
      if (json.error) {
        return Promise.reject(new Error(json.message));
      }
      this.sessionKey = json.session.key;
      return this.sessionKey;
    });
};


LastFm.prototype.prepareData = function (params) {
  return this.getSessionKey()
    .then(sk => {
      const paramsWithAuth = Object.assign({api_key: this.apiKey, sk}, params);
      return querystring.stringify(Object.assign(paramsWithAuth, {
        api_sig: this.makeSig(paramsWithAuth),
        format: 'json'
      }))
    });
};


module.exports = LastFm;
