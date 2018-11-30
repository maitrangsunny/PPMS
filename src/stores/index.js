import {
    createStore,
    applyMiddleware
} from 'redux';

import {
    composeWithDevTools
} from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga';

import {
    routerMiddleware as createRouterMiddleware
} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'
import localStorageMiddleware from './middlewares/localStorageMiddleware';

import sagaRoot from './saga';
import reducers from './reducers';

const history = createHistory();
const routerMiddleware = createRouterMiddleware(history);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(routerMiddleware, sagaMiddleware, localStorageMiddleware)
    )
);

sagaMiddleware.run(sagaRoot);

export {
    history
};
export default store;
