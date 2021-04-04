#!/usr/bin/env node

const program = require('commander');
const initAction = require('../lib/create');

program
    .command('init <name>')
    .description('create a new react project')
    .action((...args) => {
        initAction(...args);
    });

program.parse();
