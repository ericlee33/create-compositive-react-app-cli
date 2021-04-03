const chalk = require('chalk');
const log = console.log;

const colors = ['blue', 'green', 'red', 'yellow'];
const colorMethods = {};

function getColors() {
    colors.forEach(color => {
        colorMethods[color] = text => log(chalk[color](text));
    });
    return colorMethods;
}

module.exports = getColors();
