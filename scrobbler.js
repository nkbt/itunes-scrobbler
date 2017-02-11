'use strict';


const scribble = require('scribble');


const options = {};
try {
  Object.assign(options, require('./secret.json'));
} catch (err) {
  Object.assign(options, process.env);
}

const {
  LASTFM_API_KEY,
  LASTFM_SECRET,
  LASTFM_USER,
  LASTFM_PASSWORD
} = options;


exports.scrobbler = new scribble(
  LASTFM_API_KEY,
  LASTFM_SECRET,
  LASTFM_USER,
  LASTFM_PASSWORD
);
