import Types from './';
import createReducer from '../';

const INIT_STATE = ({
    navigations: {}
});

export default createReducer(INIT_STATE, {

    [Types.SET_NAVIGATION]: (state, action) => {
        return {
            ...state,
            navigations : action.payload.data
        };
    },
});