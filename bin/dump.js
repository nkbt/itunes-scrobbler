'use strict';


const {db} = require('../lib/db');


db.createReadStream()
  .on('data', ({key, value}) => console.log(key, '\t', JSON.stringify(value)));
