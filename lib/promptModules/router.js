module.exports = api => {
    api.injectFeature({
        name: 'react-router',
        message: 'react-router',
        value: 'router',
    });

    api.injectPrompt({
        type: 'list',
        message: 'Which router mode do you want to use?',
        choices: [
            {
                name: 'history',
                message: 'history',
                value: 'history',
            },
            {
                name: 'hash',
                message: 'hash',
                value: 'hash',
            },
        ],
        name: 'routerMode',
        when: answers => answers.features.includes('router'),
    });
};
