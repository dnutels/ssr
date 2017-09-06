'use strict';

const PATH = require('path');
const crypto = require('crypto');

const promisify = require('util.promisify');
const glob = promisify(require('glob'));

const {readJson, pathExists} = require('fs-extra');

const {merge} = require('lodash');

const {SECRET} = process.env;
const DEFAULT_CONFIG_PATH = '.toolsrc';

function scanComponentsPackages(componentPaths) {
    const packages = componentPaths.map((component) => {
        return readJson(PATH.normalize(`${component}/package.json`));
    });

    return Promise.all(packages);
}

async function scan(globPattern, options = {}) {
    const {cwd = process.cwd()} = options;

    const paths = await glob(globPattern, {});
    const pkgs = await scanComponentsPackages(paths);

    const normalizedPkgs = pkgs.map((packageInfo, index) => {
        const fullPath = PATH.resolve(cwd, paths[index]);
        return Object.assign({}, packageInfo, {path: fullPath});
    });

    return normalizedPkgs;
}

function encrypt(text) {
    const cipher = crypto.createCipher('aes192', SECRET);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
}

function printHash({name, version, type}) {
    if (type === 'page') {
        const hash = encrypt(JSON.stringify({[name]: version}));
        console.log(`${name}: ${version}`);
        console.log(`${hash}`);
    }
}

function prepareComponents(componentInfos, suffix = '') {
    const componentsToBuild = componentInfos.reduce((aggregator, info) => {
        const {name, version, path} = info;
        aggregator[`${name}/${version}`] = `${path}/${suffix}`;

        return aggregator;
    }, {});

    return componentsToBuild;
}

async function createEntries(paths, options = {}) {
    const entriesArray = await Promise.all(paths.map(async (path) => {
        const pkgs = await scan(path);

        pkgs.forEach(printHash);

        const componentsToBuild = prepareComponents(pkgs);
        return componentsToBuild;
    }));

    const entries = merge(...entriesArray);

    return entries;
}

module.exports = {
    createEntries
};
