'use strict';


const {scrobbler} = require('./scrobbler');
const {promiseQueue} = require('./promiseQueue');


exports.loveTracks = tracks => {
  const results = [];

  return promiseQueue(tracks, track => scrobbler.love(track).then(r => results.push(r)))
    .then(() => results)
};


exports.scrobbleTracks = tracks => {
  const results = [];

  return promiseQueue(tracks, track => scrobbler.scrobble(track).then(r => results.push(r)))
    .then(() => results)
};
