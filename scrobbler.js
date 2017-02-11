'use strict';


const path = require('path');
const LastFm = require('./lastfm');


const options = {};
try {
  Object.assign(options, require(path.join(process.cwd(), 'secret.json')));
} catch (err) {
  Object.assign(options, process.env);
}


const {
  LASTFM_API_KEY,
  LASTFM_SECRET,
  LASTFM_USER,
  LASTFM_PASSWORD
} = options;


exports.scrobbler = new LastFm({
  LASTFM_API_KEY,
  LASTFM_SECRET,
  LASTFM_USER,
  LASTFM_PASSWORD
});
