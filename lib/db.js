'use strict';


const levelup = require('levelup');
const Promise = require('bluebird');
const path = require('path');



exports.db = Promise.promisifyAll(levelup(path.join(process.cwd(), 'itunes'), {
  keyEncoding: 'json',
  valueEncoding: 'json'
}));
