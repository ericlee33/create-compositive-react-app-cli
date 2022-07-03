import path from 'path';

import inquirer from 'inquirer';

import Creator from './Creator';
import defaultFeaturesPrompts from './defaultFeaturesPrompts';
import Generator from './Generator';
import getPromptModules from './getPromptModules';
import PromptModuleAPI from './PromptModuleAPI';
import createTemplate from './templates/createTemplate';
import colors from './utils/chalk';
import executeCommand from './utils/executeCommand';

async function createApp(name: string) {
  /** 构建prompts结构 */
  const creator = new Creator();

  /** 注入默认featuresPrompts */
  creator.injectDefaultFeaturesPrompts(defaultFeaturesPrompts(name));

  /** get all module configure */
  const promptModules = getPromptModules();

  /** 获取注入creator的方法 */
  const promptApi = new PromptModuleAPI(creator);

  /** 将各个modules的配置注入到creator中 */
  promptModules.forEach(module => module(promptApi));

  /** 获取最终的prompts */
  const finalPrompts = creator.getFinalPrompts();

  const answers = await inquirer.prompt(finalPrompts);

  const packageJson = {
    name,
    version: `0.1.0`,
    dependencies: {},
    devDependencies: {},
  };

  const generator = new Generator(packageJson);

  answers.features = ['react', ...answers.features];

  answers.features.forEach(async feature => {
    const func = await import(`./generator/${feature}`);

    func(generator, answers, name);
  });

  await generator.generate(answers.start, name);

  colors.yellow(`Start installing dependencies`);

  await executeCommand('git', ['init'], path.join(process.cwd(), name));
  await executeCommand('npm', ['install'], path.join(process.cwd(), name));

  colors.green(
    `\nInstall successfully! Now, you can print \`cd ${name}\` in bash \nthen \`npm run dev\` to start your react project!\n`,
  );
}

export { createApp, createTemplate };
