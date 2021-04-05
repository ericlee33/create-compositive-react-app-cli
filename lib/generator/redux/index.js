const path = require('path');
module.exports = generator => {
    const dependencies = {
        redux: '^4.0.5',
        'redux-logger': '^3.0.6',
        'redux-thunk': '^2.3.0',
        'react-redux': '^7.2.2',
    };

    generator.extendPackage({
        dependencies,
    });

    const fullPath = path.join(__dirname, './template');

    generator.render({ fullPath });
};
