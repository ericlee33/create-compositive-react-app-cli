import { combineReducers } from 'redux';

import config from './module/config';
import login from './module/login';
import hasToken from './module/hasToken';

const rootReducer = combineReducers({
    config,
    login,
    hasToken,
});

export default rootReducer;
