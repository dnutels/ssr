'use strict';

const PATH = require('path');

const {ensureDir, copy: copyFile} = require('fs-extra');
const promisify = require('util.promisify');
const glob = promisify(require('glob'));
const zipdir = promisify(require('zip-dir'));

async function handle(dir, pattern, prefix, transform) {
    const components = await glob(`${dir}/${pattern}`);

    await Promise.all(components.map(async (component) => {
        const relative = PATH.relative(dir, component);
        const target = PATH.resolve(dir, `${prefix}/${relative}`);

        await ensureDir(target);
        await transform(component, target);
    }));
}

async function zip(dir, pattern, prefix) {
    try {
        const transform = (component, target) => {
            return zipdir(component, {saveTo: `${target}/component.zip`});
        };

        handle(dir, pattern, prefix, transform);
    } catch (err) {
        console.error(err);
    }
}

async function copy(dir, pattern, prefix) {
    try {
        const transform = (component, target) => {
            return copyFile(component, target);
        };

        handle(dir, pattern, prefix, transform);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    zip,
    copy
};
