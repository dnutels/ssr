'use strict';

const {NODE_ENV} = process.env;
const DEV = NODE_ENV === 'development';

if (DEV) {
    console.log('Running in development mode...');
}

const PATH = require('path');

const nodeExternals = require('webpack-node-externals');

const ROOT = PATH.resolve(__dirname, '.');

const NODE_MODULES = PATH.resolve(ROOT, 'node_modules/');
const CACHE_DIR_PATH = PATH.resolve(ROOT, '.cache/');

const SRC = PATH.resolve(ROOT, 'src/pages/unification');
const INDEX = PATH.resolve(SRC, 'index.js');

const DIST = PATH.resolve(ROOT, 'dist/');
const COMPONENTS = PATH.resolve(DIST, 'components/');

const PUBLIC_PATH = `/js/`;

const config = {
    target: 'node',
    entry: {
        unification: INDEX
    },
    output: {
        libraryTarget: 'commonjs-module',
        filename: '[name]/index.js',
        path: COMPONENTS
    },
    externals: [nodeExternals()],
    devtool: 'source-map',
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: SRC,
                exclude: [NODE_MODULES],
                use: [{
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: CACHE_DIR_PATH
                    }
                }]
            },
            {
                test: /\.(graphql|gql)$/,
                include: SRC,
                exclude: [NODE_MODULES],
                loader: 'graphql-tag/loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    }
};

module.exports = config;
