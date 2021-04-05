const fs = require('fs');
const path = require('path');
const config = require('../config');
const colors = require('./chalk');
const ejs = require('ejs');

let flat = 0; // copyDir 函数数量
let fileCount = 0; // 文件数量
let dirCount = 0; // 文件夹

function copyDir(
    sourceDir,
    currentDir,
    resolve,
    data = {
        routerMode: false,
    },
    ejsOptions = {},
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
            const fullCurrentDir = path.join(currentDir, p);

            fs.stat(fullSourcePath, (err, stats) => {
                if (stats && stats.isDirectory()) {
                    dirCount++;
                    /** 如果为目录，则递归复制 */
                    checkDirIsExisting(fullCurrentDir).then(() => {
                        dirCount--;
                        fileCount--;
                        copyDir(fullSourcePath, fullCurrentDir, resolve);
                        checkIsCopyCompleted(resolve);
                    });
                } else {
                    colors.yellow(`正在创建模板文件：${p}`);
                    const template = fs.readFileSync(fullSourcePath, 'utf-8');
                    const renderedTemplate = ejs.render(template, data, ejsOptions);

                    fs.writeFileSync(fullCurrentDir, renderedTemplate);

                    fileCount--;
                    checkIsCopyCompleted(resolve);
                }
            });
        });
    });
}

function checkDirIsExisting(fullCurrentDir) {
    return new Promise((resolve, reject) => {
        fs.stat(fullCurrentDir, (err, dirStats) => {
            if (err) {
                fs.mkdir(fullCurrentDir, err => {
                    if (err) {
                        reject(err);
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

function copyTemplate(sourcesConfig, name) {
    return new Promise((resolve, reject) => {
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
                        ),
                    );
                })
                .catch(err => colors.red(err));
        } catch (err) {
            console.error(`发生错误，错误原因为：${err}`);
        }
    });
}

function checkIsCopyCompleted(resolve) {
    // console.log(fileCount, dirCount, flat);
    /* when the variable is 0，the I/O operation is completed */
    if (fileCount === 0 && dirCount === 0 && flat === 0) {
        colors.green(`${config.logDefaultSeparator('模板创建完毕！')}`);
        resolve();
    }
}

function exportModules() {
    return {
        copyTemplate,
    };
}

module.exports = exportModules();
