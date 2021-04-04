#!/usr/bin/env ts-node
const inquirer = require('inquirer');
const program = require('commander');
const chalk = require('chalk');
const { copyTemplate } = require('./create');
const colors = require('../utils/chalk');
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
    // console.log(args);
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

program
    .command('init [name]')
    .description('创建项目')
    .option('-a, --add <fileName>', 'add a file')
    .action((...args) => {
        initAction(...args);
    });

program.parse(process.argv);