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

    generator.render('./template');
};
