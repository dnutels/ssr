'use strict';

const PATH = require('path');
const express = require('express');

const {COMPONENTS_DIR} = process.env;
const COMPONENTS = PATH.resolve(process.cwd(), COMPONENTS_DIR);

module.exports = express.static(COMPONENTS);
