const path = require('path');
module.exports = (generator, options) => {
    const dependencies = {
        'react-router': '^5.2.0',
    };

    generator.extendPackage({
        dependencies,
    });

    // generator.render('./template', {
    //     historyMode: options.historyMode,
    // });
    const fullPath = path.join(__dirname, './template');

    generator.render(fullPath);
};
