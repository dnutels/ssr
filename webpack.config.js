'use strict';

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

const nodeExternals = require('webpack-node-externals');
const autoprefixer = require('autoprefixer');
const reporter = require("postcss-reporter");
const stylelint = require("stylelint");

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

const BASE_CONFIG = {
    target: 'node',
    entry: {
        header: PATH.resolve(SRC, 'components/header/index.js'),
        unification: PATH.resolve(SRC, 'pages/unification/index.js')
    },
    output: {
        libraryTarget: 'commonjs-module',
        filename: '[name]/index.js',
        path: COMPONENTS
    },
    externals: [nodeExternals()],
    devtool: 'cheap-module-eval-source-map',
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
    },
    plugins: [
        new CleanWebpackPlugin([DIST]),
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
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};

const config = !DEV ? merge({}, BASE_CONFIG, PROD_CONFIG) : merge({}, BASE_CONFIG, DEV_CONFIG);

module.exports = config;
