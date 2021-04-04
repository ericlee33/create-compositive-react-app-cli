const inquirer = require('inquirer');
const chalk = require('chalk');
const { copyTemplate } = require('./utils/copyDir');
const colors = require('./utils/chalk');
const ora = require('ora');
const which = require('which');

const childProcess = require('child_process').spawn;

// which('npm').then(res => {
//     console.log(res);
//     childProcess(res, ['install', 'ora'], {
//         stdio: 'inherit',
//     });
// });

// program.version(require('../package.json').version);

const initAction = (...args) => {
    inquirer
        .prompt([
            {
                type: 'confirm',
                message: 'Start Create React App?',
                name: 'copy',
            },
            // {
            //     type: 'list',
            //     message: 'fuck list',
            //     choices: ['first', 'second', 'third'],
            //     name: 'list',
            //     when: res => Boolean(res.copy),
            // },
        ])
        .then(answers => {
            if (answers.copy) {
                const spinner = ora('Start creating template').start();
                copyTemplate()
                    .then(res => {
                        colors.blue('----- 开始install -----');
                    })
                    .catch(err => {
                        colors.red('----- create fail -----');
                    })
                    .finally(() => spinner.stop());
            }
        });
};

module.exports = initAction;
