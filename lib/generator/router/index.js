const path = require('path');
module.exports = (generator, options) => {
    const dependencies = {
        'react-router': '^5.2.0',
    };

    generator.extendPackage({
        dependencies,
    });

    const fullPath = path.join(__dirname, './template');

    generator.render({
        fullPath,
        data: {
            historyMode: options.historyMode,
        },
    });
};
