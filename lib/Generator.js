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

    async generate(isStart) {
        if (isStart) {
            let spinner = ora('Start creating-react-app').start();

            const pkg = JSON.stringify(this.pkg, null, 4);

            try {
                await this.writePkg(pkg);
            } catch (err) {
                throw `Write package.json failed`;
            }

            return copyTemplate(this.sources)
                .then(res => {
                    colors.green('----- create template successfully! -----');
                })
                .catch(err => {
                    colors.red(`----- create fail, result is ${err} -----`);
                })
                .finally(() => spinner.stop());
        }
    }

    writePkg(pkg) {
        return new Promise((resolve, reject) => {
            const pkgPath = path.join(process.cwd(), `./package.json`);

            fs.writeFile(pkgPath, pkg, err => (err ? reject() : resolve()));
        });
    }

    render(source) {
        this.sources.push(source);
    }
}

module.exports = Generator;
