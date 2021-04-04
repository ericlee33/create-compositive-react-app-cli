module.exports = class PromptModuleAPI {
    constructor(creator) {
        this.creator = creator;
    }

    injectFeature(feature) {
        const featuresPrompt = this.creator.featuresPrompt.find(
            prompt => prompt.name === 'features',
        );

        featuresPrompt?.choices.push(feature);
    }

    injectPrompt(prompt) {
        this.creator.injectedPrompts.push(prompt);
    }
};