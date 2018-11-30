import {
    set,
    get,
    getObject,
    setObject,
    getArray,
    setArray,
    clear,
    removeItem
} from '../../utils/local_storage';

export default store => next => action => {
    if (action.storage) {
        let method = action.storage.method;
        let params = Object.entries(action.storage.payload)[0];

        switch (method) {
            case 'get':
                return next({
                    ...action,
                    response: get(action.storage.payload) || ""
                });
            case 'set':
                return next({
                    ...action,
                    response: set(params[0], params[1])
                });
            case 'getObject':
                return next({
                    ...action,
                    response: getObject(action.storage.payload)
                });
            case 'setObject':
                return next({
                    ...action,
                    response: setObject(params[0], params[1])
                });
            case 'getArray':
                return next({
                    ...action,
                    response: getArray(action.storage.payload)
                });
            case 'setArray':
                return next({
                    ...action,
                    response: setArray(params[0], params[1])
                });
            case 'remove':
                return next({
                    ...action,
                    response: removeItem(action.storage.payload),
                });
        }
    }
    return next(action);
};