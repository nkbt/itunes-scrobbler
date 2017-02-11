'use strict';


const Promise = require('bluebird');


const noop = () => {};


exports.promiseQueue = (items, processor, tap = noop) => {
  const results = [];

  return items
    .reduce(
      (promise, item, i) =>
        promise.then(() =>
          processor(item, i)
            .tap(result => tap(result, item, i))
            .then(result => results.push(result))),
      Promise.resolve())
    .then(() => results);
};
