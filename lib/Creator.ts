class Creator {
  featuresPrompts: any[];
  injectedPrompts: any[];

  constructor() {
    this.featuresPrompts = [];
    this.injectedPrompts = [];
  }

  injectDefaultFeaturesPrompts(defaultFeaturesPrompts) {
    this.featuresPrompts = [...this.featuresPrompts, ...defaultFeaturesPrompts];
  }

  getFinalPrompts() {
    this.injectedPrompts.forEach(prompt => {
      const originalWhen = prompt.when || (() => true);
      prompt.when = answer => originalWhen(answer);
    });

    const mergedPrompts = [...this.featuresPrompts, ...this.injectedPrompts];

    return mergedPrompts;
  }
}

export default Creator;
