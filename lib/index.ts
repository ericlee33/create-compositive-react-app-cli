import program from 'commander';

import { createApp, createTemplate } from './create';

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
