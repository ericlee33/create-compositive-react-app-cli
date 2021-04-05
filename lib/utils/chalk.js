const chalk = require('chalk');
const log = console.log;

const colors = ['blue', 'green', 'red', 'yellow'];
const colorMethods = {};
const { logDefaultSeparator } = require('../config');

function getColors() {
    colors.forEach(color => {
        colorMethods[color] = text => log(chalk[color](logDefaultSeparator(text)));
    });
    return colorMethods;
}

module.exports = getColors();
