import path from 'path';

import inquirer from 'inquirer';

import { copyTemplate } from '../utils/copyDir';
import templatePrompts from './templatePrompts';

const createTemplateInDest = (dirPath: string, name: string, type) => {
  const sourcesConfig = [
    {
      fullPath: dirPath,
      data: {},
      ejsOptions: {},
    },
  ];

  const currentDirName = `./src/${type === 'page' ? 'routes' : 'components'}/${name}`;

  copyTemplate(sourcesConfig, currentDirName, true);
};

async function createTemplate() {
  const configPath = {
    viewsPath: path.resolve(__dirname, '../../templates/views'),
    componentsPath: path.resolve(__dirname, '../../templates/components'),
  };

  const answers = await inquirer.prompt(templatePrompts());
  const name = answers.name;

  if (answers.type === 'page') {
    createTemplateInDest(configPath.viewsPath, name, answers.type);
  } else {
    createTemplateInDest(configPath.componentsPath, name, answers.type);
  }
}

export default createTemplate;
