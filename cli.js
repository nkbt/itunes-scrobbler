#!/usr/bin/env node


const {collect, store, love, scrobble} = require('.');


collect()
  .then(store)
  .then(love)
  .then(scrobble)
  .then(() => console.log('Finished') || process.exit(0))
  .catch(error => console.log(error.stack) || process.exit(1));
