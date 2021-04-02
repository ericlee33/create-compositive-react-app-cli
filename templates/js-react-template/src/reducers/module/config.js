import { SET_LANG } from '../../constants/constants';

function config(state = { lang: 'zh-CN' }, action) {
    const { type, lang } = action;

    if (type === SET_LANG) {
        return {
            ...state,
            lang,
        };
    } else {
        return state;
    }
}

export default config;
