module.exports = api => {
    api.injectFeature({
        name: 'React-Router',
        value: 'router',
    });

    api.injectPrompt({
        type: 'list',
        message: 'Which router mode do you want to use?',
        choices: [
            {
                name: 'History',
                value: 'history',
            },
            {
                name: 'Hash',
                value: 'hash',
            },
        ],
        name: 'routerMode',
        when: answers => answers.features.includes('router'),
    });
};
