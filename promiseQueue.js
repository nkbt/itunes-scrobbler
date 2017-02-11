'use strict';


const Promise = require('bluebird');


exports.promiseQueue = (items, processor) => items
  .reduce((promise, track) =>
    promise.then(() => processor(track)), Promise.resolve());
