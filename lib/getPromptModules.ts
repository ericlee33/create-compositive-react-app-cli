import injectLinter from './promptModules/linter';
import injectRedux from './promptModules/redux';
import injectRouter from './promptModules/router';

export default () => {
  return [injectLinter, injectRedux, injectRouter];
};
