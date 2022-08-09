import * as fs from 'fs';
import * as path from 'path';

import { merge } from 'lodash';

import { success, error } from './utils';
import { copyTemplate } from './utils/copyDir';

class Generator {
  pkg: Record<string, any>;
  sources: string[];
  constructor(pkg) {
    this.pkg = pkg;
    this.sources = [];
  }

  extendPackage(fields) {
    this.pkg = merge(this.pkg, fields);
  }

  generate(isStart, name) {
    if (isStart) {
      // let spinner = ora('Start creating-react-app').start();
      success('Start creating project');

      const pkg = JSON.stringify(this.pkg, null, 2);

      return copyTemplate(this.sources, name)
        .then(() => {
          return this.writePkg(pkg, name);
        })
        .then(() => {
          success('Create template successfully!');
        })
        .catch(err => {
          error(`Create fail, the reason is: ${err}`);
        });
      // .finally(() => spinner.stop());
    }
  }

  writePkg(pkg, name) {
    return new Promise<void>((resolve, reject) => {
      const pkgPath = path.resolve(process.cwd(), name, `./package.json`);

      fs.writeFile(pkgPath, pkg, err => (err ? reject(`Write package.json failed`) : resolve()));
    });
  }

  render(sourceConfig) {
    this.sources.push(sourceConfig);
  }
}

export default Generator;
