#!/usr/bin/env node

const program = require('commander');
const { createApp, createTemplate } = require('../lib/create');

/**
 * init project
 */
program
    .command('init <name>')
    .description('Create a new react app')
    .action(name => {
        createApp(name);
    });

/**
 * create a view or component
 */
program
    .command('create')
    .description('Create a view or component template in your project')
    .action(() => {
        createTemplate();
    });

program.parse();
