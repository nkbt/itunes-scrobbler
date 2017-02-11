'use strict';


const Promise = require('bluebird');
const levelLog = require('level-logs');
const {NotFoundError} = require('level-errors');


const {db} = require('./db');


const log = Promise.promisifyAll(levelLog(db));


exports.append = queue =>
  data =>
    log.appendAsync(queue, data)
      .then(() => data);


exports.get = queue =>
  offset =>
    log.getAsync(queue, offset);


exports.getOffset = queue =>
  db.getAsync(queue)
    .catch(NotFoundError, () => 1);


exports.getMaxOffset = queue =>
  log.headAsync(queue);


exports.commitOffset = queue =>
  (offset = 0) =>
    db.putAsync(queue, offset + 1);

