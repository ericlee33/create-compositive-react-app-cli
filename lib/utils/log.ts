import chalk from 'chalk';

export const log = (...args: any[]) => {
  console.log(`[CLI]`, ...args);
};

export const warn = (...args: any[]) => {
  console.log(chalk.yellow(`[CLI]`, ...args));
};

export const error = (...args: any[]) => {
  console.log(chalk.red(...`[CLI]`, args));
};

export const info = (...args: any[]) => {
  console.log(chalk.blue(`[CLI]`, ...args));
};

export const success = (...args: any[]) => {
  console.log(chalk.green(`[CLI]`, ...args));
};
