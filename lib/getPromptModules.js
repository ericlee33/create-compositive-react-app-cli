const modulesName = require('./promptModules/moduleConstantsName');

module.exports = () => {
    return modulesName.map(module => require(`./promptModules/${module}`));
};
