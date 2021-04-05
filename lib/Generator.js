const copyTemplate = require('./utils/copyDir');
const isObject = require('./utils/isObject');
const colors = require('./utils/chalk');
const ora = require('ora');
const path = require('path');

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

    generate(isStart) {
        if (isStart) {
            const spinner = ora('Start creating template').start();

            return Promise.all(this.sources.map(source => copyTemplate(source)))
                .then(res => {})
                .catch(err => {});

            // return copyTemplate()
            //     .then(res => {
            //         colors.blue('----- 开始install -----');
            //     })
            //     .catch(err => {
            //         colors.red('----- create fail -----');
            //     })
            //     .finally(() => spinner.stop());
        }
    }

    render(source) {
        this.sources.push(source);
    }
}

module.exports = Generator;
