'use strict';

const PATH = require('path');
const express = require('express');
const prepareCleanCache = require('require-clean');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');

const {Logger} = require('../tools/');
const {renderError} = require('./error');

const {COMPONENTS_DIR, NODE_ENV} = process.env;
const COMPONENTS_DIR_PATH = PATH.resolve(process.cwd(), COMPONENTS_DIR);

function removeComponentFromCache(path) {
    if (NODE_ENV === 'development') {
        prepareCleanCache(path, false);
    }
}

function load(name) {
    const path = PATH.resolve(process.cwd(), `dist/components/${name}/`);
    return require(path).default;
}

async function renderPage(req, res) {
    const {type, version} = req.params;
    const {query} = req;

    try {
        const componentPath = PATH.resolve(COMPONENTS_DIR_PATH, type);
        removeComponentFromCache(componentPath);

        const Page = require(componentPath).default;

        const html = renderToStaticMarkup(React.createElement(Page, {
            ...query,
            load
        }));

        res.write(html);
        res.end();
    } catch (err) {
        Logger.error(err);
        res.status(500).send(renderError(err));
    }
}

const router = express.Router();

router.get('/:type/:version?', renderPage);

module.exports = router;
