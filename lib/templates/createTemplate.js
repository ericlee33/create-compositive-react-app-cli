const inquirer = require('inquirer');
const colors = require('../utils/chalk');
const path = require('path');
const templatePrompts = require('./templatePrompts');
const { copyTemplate } = require('../utils/copyDir');
const { viewsPath, componentsPath } = require('./config');

const createTemplateInDest = (dirPath, name) => {
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
    const answers = await inquirer.prompt(templatePrompts());
    const name = answers.name;

    if (answers.type === 'page') {
        createTemplateInDest(viewsPath, name);
    } else {
        createTemplateInDest(componentsPath, name);
    }
}

module.exports = createTemplate;
