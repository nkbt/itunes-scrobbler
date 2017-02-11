'use strict';


const levelup = require('levelup');
const Promise = require('bluebird');


exports.db = Promise.promisifyAll(levelup('./itunes', {
  keyEncoding: 'json',
  valueEncoding: 'json'
}));
