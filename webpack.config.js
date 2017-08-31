'use strict';

const {NODE_ENV} = process.env;
const DEV = NODE_ENV === 'development';

if (DEV) {
    console.log('Running in development mode...');
}

const PATH = require('path');

const nodeExternals = require('webpack-node-externals');
const autoprefixer = require('autoprefixer');
const reporter = require("postcss-reporter");
const stylelint = require("stylelint");

const ROOT = PATH.resolve(__dirname, '.');

const NODE_MODULES = PATH.resolve(ROOT, 'node_modules/');
const CACHE_DIR_PATH = PATH.resolve(ROOT, '.cache/');

const SRC = PATH.resolve(ROOT, 'src/');
const INDEX = PATH.resolve(SRC, 'pages/unification/index.js');

const DIST = PATH.resolve(ROOT, 'dist/');
const COMPONENTS = PATH.resolve(DIST, 'components/');

const PUBLIC_PATH = `/js/`;

const CSS_LOADERS = [
    {
        loader: 'to-string-loader'
    },
    {
        loader: 'css-loader',
        options: {
            url: false,
            sourceMap: true
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: true,
            plugins: () => [autoprefixer()]
        }
    },
    {
        loader: 'sass-loader',
        options: {
            sourceMap: true,
            outputStyle: DEV ? 'expanded' : 'compressed'
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            plugins: () => [
                stylelint(),
                reporter({clearMessages: true})
            ]
        }
    }
];

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
                test: /(\.scss|\.css)$/,
                include: SRC,
                exclude: [NODE_MODULES],
                use: CSS_LOADERS
            },
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
