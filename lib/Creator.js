class Creator {
    constructor(name) {
        this.featuresPrompt = [
            {
                type: 'confirm',
                message: `Do you want to create react app with project name: /${name}?`,
                name: 'start',
            },
            {
                type: 'checkbox',
                message: 'Choose the features that you want to start the project with',
                choices: [],
                name: 'features',
                when: answers => !!answers.start,
            },
        ];

        this.injectedPrompts = [];
    }

    getFinalPrompts() {
        this.injectedPrompts.forEach(prompt => {
            const originalWhen = prompt.when || (() => true);
            prompt.when = answer => originalWhen(answer);
        });

        const mergedPrompts = [...this.featuresPrompt, ...this.injectedPrompts];

        return mergedPrompts;
    }
}

module.exports = Creator;
