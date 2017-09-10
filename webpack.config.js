'use strict';

require('dotenv').config();

const DEV = (['build', 'profile'].indexOf(process.env.npm_lifecycle_event) < 0);

if (DEV) {
    console.log(`Running in development mode...`);
}

const PATH = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const StatsPlugin = require('stats-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const WebpackOnBuildPlugin = require('on-build-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeExternals = require('webpack-node-externals');
const autoprefixer = require('autoprefixer');
const reporter = require("postcss-reporter");
const stylelint = require("stylelint");

const {createEntries} = require('./tools/build/utils/entry');
const {zip, copy} = require('./tools/build/utils/transform');

const ROOT = PATH.resolve(__dirname, '.');

const NODE_MODULES = PATH.resolve(ROOT, 'node_modules/');
const CACHE_DIR_PATH = PATH.resolve(ROOT, '.cache/');

const SRC = PATH.resolve(ROOT, 'src/');

const DIST = PATH.resolve(ROOT, 'dist/');
const REPORT_FILE = PATH.resolve(DIST, 'report.html');
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

const extractJS = new ExtractTextPlugin({
    filename: '[name]/assets/js/index.js'
});

const BASE_CONFIG = {
    target: 'node',
    entry: () => createEntries(['src/components/*/', 'src/pages/*/']),
    output: {
        libraryTarget: 'commonjs-module',
        filename: '[name]/index.js',
        path: COMPONENTS
    },
    externals: [nodeExternals()],
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'source-map',
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /inline-assets\/fonts\/.*\.(woff|woff2)$/,
                include: SRC,
                exclude: [NODE_MODULES],
                loader: 'url-loader'
            },
            {
                test: /inline-assets\/style\/.*\.(scss|css)$/,
                include: SRC,
                exclude: [NODE_MODULES],
                use: CSS_LOADERS
            },
            {
                test: /inline-assets\/images\/.*\.svg$/,
                include: SRC,
                exclude: [NODE_MODULES],
                loader: 'svg-inline-loader',
                options: {
                    removeTags: true,
                    removeSVGTagAttrs: true
                }
            },
            {
                test: /inline-assets\/js\/.*\.(js|jsx)$/,
                include: SRC,
                exclude: [NODE_MODULES],
                use: [{
                    loader: 'raw-loader'
                // }, {
                //     loader: 'eslint-loader'
                }]
            },
            {
                test: /\.(js|jsx)$/,
                include: SRC,
                exclude: [NODE_MODULES],
                loader: 'babel-loader',
                options: {
                    cacheDirectory: CACHE_DIR_PATH
                }
            },
            {
                test: /[^-]assets\/js\/.*\.js$/,
                include: SRC,
                exclude: [NODE_MODULES],
                use: extractJS.extract({
                    use: [
                        {
                            loader: 'raw-loader'
                        }
                    ],
                    remove: true
                })
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
    },
    plugins: [
        new CleanWebpackPlugin([DIST]),
        extractJS
    ]
};

const DEV_CONFIG = {};

const PROD_CONFIG = {
    devtool: false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new UglifyJsPlugin({extractComments: true}),
        new OptimizeJsPlugin({sourceMap: false}),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new WebpackOnBuildPlugin(async (stats) => {
            await zip(DIST, 'components/*/*', 'private');
            await copy(DIST, 'components/**/assets*/*', 'public');
        })
    ]
};

const config = !DEV ? merge({}, BASE_CONFIG, PROD_CONFIG) : merge({}, BASE_CONFIG, DEV_CONFIG);

module.exports = config;
