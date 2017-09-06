'use strict';

const PATH = require('path');

const express = require('express');
const prepareCleanCache = require('require-clean');
const {readJson} = require('fs-extra');

const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');

const {Logger} = require('../tools/');
const {renderError} = require('./error');

const {COMPONENTS_DIR, NODE_ENV, DATA_FILE} = process.env;

const COMPONENTS_DIR_PATH = PATH.resolve(process.cwd(), COMPONENTS_DIR);
const DATA_FILE_PATH = PATH.resolve(process.cwd(), DATA_FILE);

function removeComponentFromCache(path) {
    if (NODE_ENV === 'development') {
        prepareCleanCache(path, false);
    }
}

function load(name, version) {
    const path = PATH.resolve(process.cwd(), `dist/components/${name}/${version}/`);
    removeComponentFromCache(path);

    return require(path).default;
}

async function renderPage(req, res) {
    const {name, version} = req.params;

    try {
        const component = load(name, version);
        const {PKG} = component;
        const {dependencies = {}} = PKG;

        const data = await readJson(DATA_FILE_PATH);

        const start = process.hrtime();
        const html = renderToStaticMarkup(React.createElement(component, {
            ...data,
            load,
            dependencies
        }));
        const elapsed = process.hrtime(start);
        console.log(`Elapsed: ${elapsed[0] * 1e3 + elapsed[1] / 1e6}ms`);

        res.write(html);
        res.end();
    } catch (err) {
        Logger.error(err);
        res.status(500).send(renderError(err));
    }
}

const router = express.Router();

router.get('/:name/:version?', renderPage);

module.exports = router;
