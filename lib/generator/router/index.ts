import * as path from 'path';
export default (generator, options) => {
  const dependencies = {
    'react-router-dom': '^5.2.0',
  };

  generator.extendPackage({
    dependencies,
  });

  const fullPath = path.resolve(__dirname, '../../../templates/router');

  generator.render({
    fullPath,
    data: {
      routerMode: options.routerMode,
      needRedux: options.features.includes('redux'),
    },
  });
};
