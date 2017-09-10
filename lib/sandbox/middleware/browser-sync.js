'use strict';

const PATH = require('path');

const browserSync = require('browser-sync');
const connect = require('connect-browser-sync');

const {COMPONENTS_DIR, PORT, DEV_PORT} = process.env;
const COMPONENTS = PATH.resolve(process.cwd(), COMPONENTS_DIR);

const bs = browserSync.create().init({
    port: DEV_PORT,
    reloadDelay: 10,
    browser: [],
    notify: false,
    logConnections: true,
    injectChanges: true,
    reloadOnRestart: true,
    watchOptions: {
        ignoreInitial: true,
        ignored: '*.zip'
    },
    files: [COMPONENTS],
    proxy: `http://localhost:${PORT}`
});

function browserSyncMiddleware() {
    return connect(bs);
}

module.exports = browserSyncMiddleware;
