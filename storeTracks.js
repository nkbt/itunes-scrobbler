'use strict';


const {NotFoundError} = require('level-errors');


const {promiseQueue} = require('./promiseQueue');
const {db} = require('./db');
const {append} = require('./queue');


const scrobble = track => append('scrobble')(track)
  .tap(({name}) => console.log(`Will scrobble: ${name}`));


const love = track => append('love')(track)
  .tap(({name}) => console.log(`Will love: ${name}`));


const save = track => db
  .putAsync(track.id, track)
  .then(() => track);


const skip = track => track instanceof Error ?
  console.log(track.stack) :
  console.log(`Skipping: ${track.name}`);


const maybeQueue = track => db.getAsync(track.id)
  .then(({playCount, lastPlayed, loved}) => {
    const promises = [];
    if (track.playCount > playCount || track.lastPlayed > lastPlayed) {
      promises.push(scrobble(track))
    }
    if (track.loved && !loved) {
      promises.push(love(track))
    }
    return promises;
  })
  .catch(NotFoundError, () => {
    const promises = [];
    if (track.playCount && track.lastPlayed) {
      promises.push(scrobble(track))
    }
    if (track.loved) {
      promises.push(love(track))
    }
    return promises;
  })
  .then(promises => promises.length ?
    Promise.all(promises).then(() => track) :
    Promise.reject(track));


const processTrack = track => maybeQueue(track)
  .then(save)
  .catch(skip);


exports.storeTracks = tracks => promiseQueue(tracks, processTrack);
