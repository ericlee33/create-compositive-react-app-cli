import { SET_CAN_USE_GET_USER_MEDIA, SET_IS_PC } from '../../constants/constants';

export function setCanUseGetUserMedia(canUseGetUserMedia) {
    return {
        type: SET_CAN_USE_GET_USER_MEDIA,
        canUseGetUserMedia,
    };
}

export function setIsPc(isPC) {
    return {
        type: SET_IS_PC,
        isPC,
    };
}
