'use strict';


const Promise = require('bluebird');
const levelLog = require('level-logs');


const {db} = require('./db');


const log = Promise.promisifyAll(levelLog(db));


exports.append = track => log
  .appendAsync('scrobble', track)
  .then(() => track);


exports.get = i => log
  .getAsync('scrobble', i);
