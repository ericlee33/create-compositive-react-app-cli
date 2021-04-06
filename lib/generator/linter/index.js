const path = require('path');
module.exports = generator => {
    const devDependencies = {
        eslint: '^7.11.0',
        prettier: '^2.2.1',
        'eslint-config-prettier': '^8.1.0',
        'eslint-plugin-prettier': '^3.3.1',
        'eslint-plugin-react-hooks': '^4.2.0',
        'babel-eslint': '^10.1.0',
    };

    generator.extendPackage({
        devDependencies,
    });

    const fullPath = path.join(__dirname, './template');

    generator.render({ fullPath });
};