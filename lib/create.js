const inquirer = require('inquirer');
const { copyTemplate } = require('./utils/copyDir');
const colors = require('./utils/chalk');
const ora = require('ora');
const which = require('which');

const childProcess = require('child_process').spawn;
const PromptModuleAPI = require('./PromptModuleAPI');
const getPromptModules = require('./getPromptModules');
const defaultFeaturesPrompts = require('./defaultFeaturesPrompts');
const creator = require('./Creator');
const Creator = require('./Creator');

// which('npm').then(res => {
//     console.log(res);
//     childProcess(res, ['install', 'ora'], {
//         stdio: 'inherit',
//     });
// });

// program.version(require('../package.json').version);

async function create(name) {
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
    console.log(answers);
    // if (answers.copy) {
    //     const spinner = ora('Start creating template').start();
    //     copyTemplate()
    //         .then(res => {
    //             colors.blue('----- 开始install -----');
    //         })
    //         .catch(err => {
    //             colors.red('----- create fail -----');
    //         })
    //         .finally(() => spinner.stop());
    // }
}

module.exports = create;
