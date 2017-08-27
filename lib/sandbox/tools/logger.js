'use strict';

const chalk = require('chalk');
const {argv} = require('yargs');
const {verbose} = argv;

let Logger = {
    ok()  {},
    info() {},
    log() {},
    error(...args) {
        console.error(...args);
    }
};

if (verbose) {
    Logger = {
        ok(message, ...rest) {
            console.info(chalk.green(message), ...rest);
        },

        info(message, ...rest) {
            console.info(chalk.cyan(message), ...rest);
        },

        log(message, ...rest) {
            console.log(chalk.cyan(message), ...rest);
        },

        error(message, ...rest) {
            console.error(chalk.red(message), ...rest);
        }
    };
}

module.exports = Logger;
