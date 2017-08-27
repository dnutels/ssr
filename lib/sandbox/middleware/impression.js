'use strict';

const uuid = require('uuid/v4');

function impression() {
    return function skip(req, res, next) {
        const requestId = uuid();
        req.requestId = requestId;
        next();
    };
}

module.exports = impression;
