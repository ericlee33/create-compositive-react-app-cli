#!/usr/bin/env node

const program = require('commander');
const prompts = require('../lib/create');

program
    .command('init <name>')
    .description('create a new react project')
    .action(name => {
        prompts(name);
    });

program.parse();
