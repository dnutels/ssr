'use strict';

const PATH = require('path');

const promisify = require('util.promisify');
const express = require('express');
const prepareCleanCache = require('require-clean');
const {readJson} = require('fs-extra');
const {isEmpty} = require('lodash');
const glob = promisify(require('glob'));
const {gte} = require('semver');

const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');

const {Logger} = require('../tools/');
const {renderError} = require('./error');

const {COMPONENTS_DIR, NODE_ENV, DATA_FILE} = process.env;
const DEFAULT_VERSION = '0.0.0';

const COMPONENTS_DIR_PATH = PATH.resolve(process.cwd(), COMPONENTS_DIR);
const DATA_FILE_PATH = PATH.resolve(process.cwd(), DATA_FILE);

function removeComponentFromCache(path) {
    if (NODE_ENV === 'development') {
        prepareCleanCache(path, false);
    }
}

async function loadLatest(name) {
    const path = `${COMPONENTS_DIR_PATH}/${name}`;
    let max = DEFAULT_VERSION;

    try {
        const versionPaths = await glob(`${path}/*`);

        versionPaths.forEach((versionPath) => {
            const version = PATH.relative(path, versionPath);
            max = gte(version, max) ? version : max;
        });
    } catch (err) {
        if (NODE_ENV === 'development') {
            console.warn(`LATEST FAILED: ${name} ${version}`);
            max = DEFAULT_VERSION;
        }
    }

    return max;
}

function loadLocal(name, version) {
    if (NODE_ENV === 'development') {
        console.log(`LOCAL: ${name} ${version}`);
    }

    const path = PATH.resolve(process.cwd(), `dist/components/${name}/${version}/`);
    removeComponentFromCache(path);

    return require(path).default;
}

async function loadRemote(name, version) {
    if (NODE_ENV === 'development') {
        console.log(`REMOTE: ${name} ${version}`);
    }

    const path = PATH.resolve(process.cwd(), `dist/components/${name}/${version}/`);
    removeComponentFromCache(path);

    return loadLocal(name, version);
}

async function load(name, requestedVersion) {
    let component = {};
    let version = requestedVersion;

    try {
        if (!version) {
            version = await loadLatest(name);

            if (NODE_ENV === 'development') {
                console.warn(`LATEST: ${name} ${version}`);
            }
        }

        component = loadLocal(name, version);
    } catch (err) {
        if (NODE_ENV === 'development') {
            console.warn(`FALLBACK: ${name} ${version}`);
        }

        try {
            component = await loadRemote(name, version);
        } catch (err) {
            if (NODE_ENV === 'development') {
                console.warn(`PLACEHOLDER: ${name} ${version}`);
            }

            component = () => null;
        }
    }

    return component;
}

const PARSER = (name, version) => `/components/${name}/${version}/assets/js/index.js`;

async function loadScripts(pagePkg, baseURL) {
    const {name: pageName, version: pageVersion, dependencies} = pagePkg;
    const allDependencies = {...{[pageName]: pageVersion}, ...dependencies};

    const names = Object.keys(allDependencies);

    const components = await Promise.all(names.map((name) => {
        const version = allDependencies[name];
        return load(name, version);
    }));

    const assets = components.reduce((aggregator, {PKG, JS}) => {
        if (JS) {
            const {name, version} = PKG;
            const path = PARSER(name, version);

            aggregator.push(`${baseURL}${path}`);
        }
        return aggregator;
    }, []);

    return assets;
}

async function renderPage(req, res) {
    const {name, version} = req.params;

    try {
        const baseURL = `${req.protocol}://${req.get('host')}`;

        const component = await load(name, version);

        const {PKG, ASSETS, QUERY} = component;
        const {dependencies} = PKG;

        const scripts = await loadScripts(PKG, baseURL);

        const data = await readJson(DATA_FILE_PATH);

        const start = process.hrtime();
        const html = renderToStaticMarkup(React.createElement(component, {
            ...data,
            load: loadLocal,
            dependencies,
            scripts
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
