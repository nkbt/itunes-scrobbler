'use strict';


const {storeTracks: store} = require('./lib/storeTracks');
const {collectTracks: collect} = require('./lib/collectTracks');
const {scrobbleTracks: scrobble, loveTracks: love} = require('./lib/submitTracks');


exports.store = store;
exports.collect = collect;
exports.love = love;
exports.scrobble = scrobble;
