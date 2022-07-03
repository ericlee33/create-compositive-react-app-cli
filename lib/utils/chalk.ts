import chalk from 'chalk';

import { logDefaultSeparator } from '../config';

const log = console.log;

const colors = { blue: 'blue', green: 'green', red: 'red', yellow: 'yellow' };

function getColors() {
  return Object.keys(colors).reduce((obj, color) => {
    obj[color] = text => log(chalk[color](logDefaultSeparator(text)));
    return obj;
  }, {}) as { [key in keyof typeof colors]: (...args: any[]) => any };
}

export default getColors();
