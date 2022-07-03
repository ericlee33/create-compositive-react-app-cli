import inquirer from 'inquirer';
import path from 'path';
import templatePrompts from './templatePrompts';
import { copyTemplate } from '../utils/copyDir';
import configPath from './config';

const createTemplateInDest = (dirPath: string, name: string) => {
  const sourceDir = path.join(__dirname, dirPath);

  const sourcesConfig = [
    {
      fullPath: sourceDir,
      data: {},
      ejsOptions: {},
    },
  ];

  const currentDirName = path.join('./src', dirPath, name);

  copyTemplate(sourcesConfig, currentDirName, true);
};

async function createTemplate() {
  const { viewsPath, componentsPath } = configPath;

  const answers = await inquirer.prompt(templatePrompts());
  const name = answers.name;

  if (answers.type === 'page') {
    createTemplateInDest(viewsPath, name);
  } else {
    createTemplateInDest(componentsPath, name);
  }
}

export default createTemplate;
