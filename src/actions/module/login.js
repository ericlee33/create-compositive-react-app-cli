import { REMOVE_LOGIN, SET_LOGIN } from '../../constants/constants';

export function setLogin(data) {
    return {
        type: SET_LOGIN,
        newLoginData: data,
    };
}

export function removeLogin() {
    return {
        type: REMOVE_LOGIN,
        newLoginData: null,
    };
}
