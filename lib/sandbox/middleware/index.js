'use strict';

const compression = require('compression');

const browserSync = require('./browser-sync');
const impression = require('./impression');
const logging = require('./logging');

const middleware = [
    browserSync(),
    impression(),
    logging(),
    compression()
];

module.exports = middleware;
