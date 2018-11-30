import {
    combineReducers
} from 'redux';

import {
    routerReducer
} from 'react-router-redux'

import app from './states/app/reducer';
import authenticate from './states/authenticate/reducer';
import product from './states/product/reducer';
import storage from './states/storage/reducer';
import admin from './states/admin/reducer';
export default combineReducers({
    admin,
    app,
    authenticate,
    product,
    storage,    
    router: routerReducer
});