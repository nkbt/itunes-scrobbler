'use strict';


const Promise = require('bluebird');


exports.queue = (items, processor) => items
  .reduce((promise, track) =>
    promise.then(() => processor(track)), Promise.resolve());
