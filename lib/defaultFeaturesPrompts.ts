export default name => [
  {
    type: 'confirm',
    message: `Do you want to create react app with project name: ${name}?`,
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
