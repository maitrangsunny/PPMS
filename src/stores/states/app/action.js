import {
    push
} from 'react-router-redux'
import Types from './';

export function navigate(...params) {
    return push(...params);
}

export function setNavigation(data) {
    return {
        type: Types.SET_NAVIGATION,
        payload: {
            data
        }
    }
}