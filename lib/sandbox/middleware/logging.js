'use strict';

const morgan = require('morgan');

function logging() {
    return morgan('dev');
}

module.exports = logging;
