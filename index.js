'use strict';


const {storeTracks: store} = require('./storeTracks');
const {collectTracks: collect} = require('./collectTracks');
const {scrobbleTracks: scrobble, loveTracks: love} = require('./submitTracks');


exports.store = store;
exports.collect = collect;
exports.love = love;
exports.scrobble = scrobble;
