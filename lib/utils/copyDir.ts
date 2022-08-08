import * as fs from 'fs';
import * as path from 'path';

import * as ejs from 'ejs';

import { error, info } from './log';

let flat = 0; // copyDir 函数数量
let fileCount = 0; // 文件数量
let dirCount = 0; // 文件夹

function copyDir(
  sourceDir,
  currentDir,
  resolve,
  data = {
    routerMode: false,
    needRedux: false,
    projectName: '',
  },
  ejsOptions = {},
  isTemplate = false,
) {
  flat++;

  fs.readdir(sourceDir, (err, paths) => {
    flat--;
    if (err) {
      throw err;
    }
    paths.map(p => {
      fileCount++;
      const fullSourcePath = path.join(sourceDir, p);
      let fullCurrentDir = path.join(currentDir, p);

      fs.stat(fullSourcePath, (err, stats) => {
        if (stats && stats.isDirectory()) {
          dirCount++;
          /** 如果为目录，则递归复制 */
          checkDirIsExisting(fullCurrentDir)
            .then(() => {
              dirCount--;
              fileCount--;
              copyDir(fullSourcePath, fullCurrentDir, resolve, data, ejsOptions, isTemplate);
              checkIsCopyCompleted(resolve);
            })
            .catch(console.error);
        } else {
          checkDirIsExisting(currentDir)
            .then(() => {
              const template = fs.readFileSync(fullSourcePath, 'utf-8');
              const renderedTemplate = ejs.render(template, data, ejsOptions);
              if (isTemplate) {
                /** 更改basename为用户输入的name */
                const parsedPath = path.parse(fullCurrentDir);
                const pathArgv = parsedPath.dir.split('/');
                const name = pathArgv.pop() ?? '';
                fullCurrentDir = path.join(
                  pathArgv.join('/'),
                  name,
                  parsedPath.base.replace('index', name),
                );
                p = parsedPath.base.replace('index', name);
              }
              info(`Creating template: ${p}`);
              fs.writeFileSync(fullCurrentDir, renderedTemplate);

              fileCount--;
              checkIsCopyCompleted(resolve);
            })
            .catch(console.error);
        }
      });
    });
  });
}

function checkDirIsExisting(fullCurrentDir) {
  return new Promise<void>((resolve, reject) => {
    fs.stat(fullCurrentDir, err => {
      if (err) {
        fs.mkdir(fullCurrentDir, err => {
          if (err) {
            reject(`Directory is not exist, please check your workspace directory ${err}`);
            return;
          } else {
            resolve();
          }
        });
      }
      resolve();
    });
  });
}

export function copyTemplate(sourcesConfig, name, isTemplate?: boolean) {
  return new Promise(resolve => {
    try {
      /** cwd为node运行时的目录 */
      const currentDir = path.join(process.cwd(), name);

      checkDirIsExisting(currentDir)
        .then(res => {
          sourcesConfig.forEach(sourceConfig =>
            copyDir(
              sourceConfig.fullPath,
              currentDir,
              resolve,
              sourceConfig.data,
              sourceConfig.ejsOptions,
              isTemplate,
            ),
          );
        })
        .catch(err => error(err));
    } catch (err) {
      console.error(`An error occurs, the reason is: ${err}`);
    }
  });
}

function checkIsCopyCompleted(resolve) {
  // console.log(fileCount, dirCount, flat);
  /* when the variable is 0，the I/O operation is completed */
  if (fileCount === 0 && dirCount === 0 && flat === 0) {
    resolve();
  }
}
