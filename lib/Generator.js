const { copyTemplate } = require('./utils/copyDir');
const isObject = require('./utils/isObject');
const colors = require('./utils/chalk');
const ora = require('ora');
const path = require('path');
const fs = require('fs');

class Generator {
    constructor(pkg) {
        this.pkg = pkg;
        this.sources = [];
    }

    extendPackage(fields) {
        const pkg = this.pkg;

        for (const key in fields) {
            const value = fields[key];

            if (isObject(value)) {
                pkg[key]
                    ? (pkg[key] = {
                          ...pkg[key],
                          ...value,
                      })
                    : (pkg[key] = value);
            }
        }
    }

    generate(isStart, name) {
        if (isStart) {
            let spinner = ora('Start creating-react-app').start();

            const pkg = JSON.stringify(this.pkg, null, 4);

            return copyTemplate(this.sources, name)
                .then(res => {
                    return this.writePkg(pkg, name);
                })
                .then(() => {
                    colors.green('----- create template successfully! -----');
                })
                .catch(err => {
                    colors.red(`----- create fail, result is ${err} -----`);
                })
                .finally(() => spinner.stop());
        }
    }

    writePkg(pkg, name) {
        return new Promise((resolve, reject) => {
            const pkgPath = path.join(process.cwd(), name, `./package.json`);

            fs.writeFile(pkgPath, pkg, err =>
                err ? reject(`Write package.json failed`) : resolve(),
            );
        });
    }

    render(sourceConfig) {
        this.sources.push(sourceConfig);
    }
}

module.exports = Generator;
