class PromptModuleAPI {
  creator: {
    featuresPrompts: any[];
    injectedPrompts: any[];
  };
  constructor(creator) {
    this.creator = creator;
  }

  injectFeature(feature) {
    const featuresPrompt = this.creator.featuresPrompts.find(prompt => prompt.name === 'features');

    featuresPrompt && featuresPrompt.choices.push(feature);
  }

  injectPrompt(prompt) {
    this.creator.injectedPrompts.push(prompt);
  }
}

export default PromptModuleAPI;
