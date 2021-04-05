const inquirer = require('inquirer');
const which = require('which');
const childProcess = require('child_process').spawn;
const PromptModuleAPI = require('./PromptModuleAPI');
const getPromptModules = require('./getPromptModules');
const defaultFeaturesPrompts = require('./defaultFeaturesPrompts');
const Creator = require('./Creator');
const Generator = require('./Generator');
const colors = require('./utils/chalk');
const { logDefaultSeparator } = require('./config');

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

    const packageJson = {
        name,
        version: `0.1.0`,
        dependencies: {},
        devDependencies: {},
        eslintConfig: {
            extends: ['react-app', 'react-app/jest'],
        },
        scripts: {
            dev: 'react-scripts start',
            build: 'react-scripts build',
            test: 'react-scripts test',
            eject: 'react-scripts eject',
        },
    };

    const generator = new Generator(packageJson);

    answers.features = ['react', ...answers.features];

    answers.features.forEach(feature => require(`./generator/${feature}`)(generator, answers));

    await generator.generate(answers.start);

    colors.yellow(`start installing dependencies`);

    await which('npm').then(res => {
        console.log(res);
        childProcess(res, ['install'], {
            stdio: 'inherit',
        });
    });

    colors.green(
        `install successfully! Now you can 'cd ${name}' then 'npm run dev' \n to start your react project!`,
    );
}

module.exports = create;
