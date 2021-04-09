const inquirer = require('inquirer');
const childProcess = require('child_process').spawn;
const PromptModuleAPI = require('./PromptModuleAPI');
const getPromptModules = require('./getPromptModules');
const defaultFeaturesPrompts = require('./defaultFeaturesPrompts');
const Creator = require('./Creator');
const Generator = require('./Generator');
const colors = require('./utils/chalk');
const path = require('path');
const { logDefaultSeparator } = require('./config');
const executeCommand = require('./utils/executeCommand');
const createTemplate = require('./templates/createTemplate');

async function createApp(name) {
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

    answers.features.forEach(feature =>
        require(`./generator/${feature}`)(generator, answers, name),
    );

    await generator.generate(answers.start, name);

    colors.yellow(`Start installing dependencies`);

    await executeCommand('git', ['init'], path.join(process.cwd(), name));
    await executeCommand('npm', ['install'], path.join(process.cwd(), name));

    colors.green(
        `\ninstall successfully! Now, you can print \`cd ${name}\` in bash \nthen \`npm run dev\` to start your react project!\n`,
    );
}

module.exports = { createApp, createTemplate };
