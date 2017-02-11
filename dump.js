'use strict';


const {db} = require('./db');


db.createReadStream()
  .on('data', ({key, value}) => console.log(key, '\t', JSON.stringify(value)));
