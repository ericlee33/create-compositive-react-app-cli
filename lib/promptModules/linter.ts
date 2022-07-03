export default api => {
  api.injectFeature({
    name: 'Linter(Eslint) / Formatter(Prettier + EditorConfig)',
    message: 'linter',
    value: 'linter',
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
