import * as path from 'path';
export default generator => {
  const dependencies = {
    redux: '^4.0.5',
    'redux-logger': '^3.0.6',
    'redux-thunk': '^2.3.0',
    'react-redux': '^7.2.2',
    'redux-devtools-extension': '^2.13.8',
  };

  generator.extendPackage({
    dependencies,
  });

  const fullPath = path.resolve(__dirname, '../../../templates/redux');

  generator.render({ fullPath });
};
