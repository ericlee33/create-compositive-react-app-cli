const fs = require('fs');
const path = require('path');
const config = require('../config');
const colors = require('./chalk');

let flat = 0; // copyDir 函数数量
let fileCount = 0; // 文件数量
let dirCount = 0; // 文件夹

function copyDir(sourceDir, currentDir, resolve) {
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
                        copyDir(fullSourcePath, fullCurrentDir, resolve);
                        checkIsCopyCompleted(resolve);
                    });
                } else {
                    colors.yellow(`正在创建模板文件：${p}`);
                    const rs = fs.createReadStream(fullSourcePath);
                    const ws = fs.createWriteStream(fullCurrentDir);
                    rs.pipe(ws).on('close', () => {
                        fileCount--;
                        checkIsCopyCompleted(resolve);
                    });
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
            dirCount--;
            fileCount--;
            resolve();
        });
    });
}

function copyTemplate(sourcesDir) {
    return new Promise((resolve, reject) => {
        try {
            /** cwd为node运行时的目录 */
            const currentDir = process.cwd();

            sourcesDir.forEach(sourceDir => copyDir(sourceDir, currentDir, resolve));
        } catch (err) {
            console.error(`发生错误，错误原因为：${err}`);
        }
    });
}

function checkIsCopyCompleted(resolve) {
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
