module.exports = () => [
    {
        type: 'list',
        message: 'Which type of templates do you want to create?',
        choices: [
            {
                name: 'Page',
                value: 'page',
            },
            {
                name: 'Component',
                value: 'component',
            },
        ],
        name: 'type',
    },
    {
        type: 'input',
        message: 'Please enter a name',
        name: 'name',
        validate(templateName) {
            var done = this.async();

            if (templateName.length === 0) {
                return done('You need to provide a name');
            } else if (templateName.length > 20) {
                return done('Name must be less than 20 words!');
            } else {
                done(null, true);
            }
        },
    },
];
