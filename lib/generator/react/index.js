const path = require('path');
module.exports = (
    generator,
    options = {
        features: [],
        routerMode: false,
    },
) => {
    const dependencies = {
        react: '^17.0.1',
        'react-dom': '^17.0.1',
        'react-scripts': '4.0.3',
    };

    const devDependencies = {
        '@types/react': '^17.0.3',
        '@types/react-dom': '^17.0.3',
        'sass-loader': '^11.0.1',
        'node-sass': '^5.0.0',
    };

    generator.extendPackage({
        dependencies,
        devDependencies,
    });

    const fullPath = path.join(__dirname, './template');

    generator.render({
        fullPath,
        data: {
            needRedux: options.features.includes('redux'),
        },
    });
};
