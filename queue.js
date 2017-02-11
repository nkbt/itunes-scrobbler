'use strict';


const Promise = require('bluebird');
const levelLog = require('level-logs');


const {db} = require('./db');


const log = Promise.promisifyAll(levelLog(db));


exports.append = queue => track => log
  .appendAsync(queue, track)
  .then(() => track);


exports.get = queue => i => log
  .getAsync(queue, i);
