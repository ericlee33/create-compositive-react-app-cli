import { SET_LANG } from '../../constants/constants';

export function setLang(lang) {
    return {
        type: SET_LANG,
        lang,
    };
}
