'use strict';

const Promise = require('bluebird');
const {get, getOffset, getMaxOffset, commitOffset} = require('./queue');
const {scrobbler} = require('./scrobbler');
const {promiseQueue} = require('./promiseQueue');


const range = ([from, to]) => from >= to ? [] :
  (new Array(to - from + 1))
    .join('.').split('.')
    .map((_, i) => from + i);


const scrobbleTracks = tracks => promiseQueue(tracks, track => scrobbler.scrobble(track));
exports.scrobbleTracks = scrobbleTracks;


exports.loveTracks = () => {
  const QUEUE = 'love';
  let from = 1;

  const commit = commitOffset(QUEUE);


  const processor = (track, i) => scrobbler.love(track)
    .tap(() => commit(from + i));


  const tap = (response, {name}) => console.log(`Successfully loved: ${name}`);


  return Promise.all([getOffset(QUEUE), getMaxOffset(QUEUE)])
    .then(range)
    .tap(offsets => (from = offsets[0]))
    .then(offsets => promiseQueue(offsets, get(QUEUE)))
    .then(tracks => promiseQueue(tracks, processor, tap))
};


exports.scrobbleTracks = () => {
  const QUEUE = 'scrobble';
  let from = 1;

  const commit = commitOffset(QUEUE);


  const processor = (track, i) => scrobbler.scrobble(track)
    .tap(() => commit(from + i));


  const status = response => {
    if (response.scrobbles['@attr'].accepted) {
      return '[ACCEPTED]';
    }

    if (response.scrobbles['@attr'].ignored) {
      if (response.scrobbles.scrobble.ignoredMessage['#text']) {
        return `[IGNORED] ${response.scrobbles.scrobble.ignoredMessage['#text']}`;
      }
      return `[IGNORED] Too old ${new Date(response.scrobbles.scrobble.timestamp * 1000)}`;
    }

    return '';
  };


  const tap = (response, {name}) => console.log(`Scrobbled: ${name}`, status(response));


  return Promise.all([getOffset(QUEUE), getMaxOffset(QUEUE)])
    .then(range)
    .tap(offsets => (from = offsets[0]))
    .then(offsets => promiseQueue(offsets, get(QUEUE)))
    .then(tracks => promiseQueue(tracks, processor, tap))
};
