const fs = require('fs');
const path = require('path');
const config = require('../config');
const colors = require('./chalk');

let flat = 0; // readir数量
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
                    // console.log(fullSourcePath, fullCurrentDir)
                    console.log(`${config.logDefaultSeparator(`正在创建${p}文件`)}`);
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

function copyTemplate() {
    return new Promise((resolve, reject) => {
        try {
            /** template源，去除/lib，拼接出模板的路径 */
            const sourceDir = path.join(__dirname.slice(0, -3), config.template);
            /** cwd为node运行时的目录 */
            const currentDir = process.cwd();
            copyDir(sourceDir, currentDir, resolve);
        } catch (err) {
            console.error(`发生错误，错误原因为：${err}`);
        }
    });
}

function checkIsCopyCompleted(resolve) {
    /* 三变量均为0，异步I/O执行完毕。 */
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
