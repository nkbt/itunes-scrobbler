'use strict';


const {NotFoundError} = require('level-errors');


const {promiseQueue} = require('./promiseQueue');
const {db} = require('./db');
const {append: scrobble} = require('./scrobbleQueue');


const shouldScrobble = track => db
  .getAsync(track.id)
  .then(({playCount, lastPlayed}) =>
    playCount < track.playCount || lastPlayed < track.lastPlayed ?
      Promise.resolve(track) :
      Promise.reject(track))
  .catch(NotFoundError, () => Promise.resolve(track));


const save = track => db
  .putAsync(track.id, track)
  .then(() => track);


const skip = track => track instanceof Error ?
  console.log(track.stack) :
  console.log(`Skipping: ${track.name}`);


const processTrack = track => shouldScrobble(track)
  .tap(() => console.log(`Will scrobble: ${track.name}`))
  .then(scrobble)
  .then(save)
  .catch(skip);


exports.storeTracks = tracks => promiseQueue(tracks, processTrack);
