import chalk from 'chalk';

export const log = (...args: any[]) => {
  console.log(...args);
};

export const warn = (...args: any[]) => {
  console.log(`[cli]`, chalk.yellow(...args));
};

export const error = (...args: any[]) => {
  console.log(`[cli]`, chalk.red(...args));
};

export const info = (...args: any[]) => {
  console.log(`[cli]`, chalk.blue(...args));
};

export const success = (...args: any[]) => {
  console.log(`[cli]`, chalk.green(...args));
};
