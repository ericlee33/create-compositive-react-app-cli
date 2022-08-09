import * as path from 'path';
export default (
  generator,
  options = {
    features: [] as string[],
    routerMode: false,
  },
  name,
) => {
  const dependencies = {
    react: '^17.0.1',
    'react-dom': '^17.0.1',
    'react-scripts': '4.0.3',
  };

  const devDependencies = {
    '@types/react': '^17.0.3',
    '@types/react-dom': '^17.0.3',
    'sass-loader': '^11.0.1',
    'node-sass': '^5.0.0',
    'styled-components': '^5',
  };

  generator.extendPackage({
    dependencies,
    devDependencies,
    eslintConfig: {
      extends: ['react-app', 'react-app/jest'],
    },
    scripts: {
      dev: 'react-scripts start',
      build: 'react-scripts build',
      test: 'react-scripts test',
      eject: 'react-scripts eject',
    },
    browserslist: {
      production: ['>0.2%', 'not dead', 'not op_mini all'],
      development: ['last 1 chrome version', 'last 1 firefox version', 'last 1 safari version'],
    },
  });

  const fullPath = path.resolve(__dirname, '../../../templates/react');

  generator.render({
    fullPath,
    data: {
      needRedux: options.features.includes('redux'),
      projectName: name,
    },
  });
};
