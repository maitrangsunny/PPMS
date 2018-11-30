export default testMiddleware = store => next => action => {
    // if (action.payload && action.payload.func) {
    //     let data = action.payload.func();
    //     // alert('data : ' + data);
    //     return new Promise((resolve, reject) => resolve(resolved({
    //         store, next, action, value: { data, error: null }
    //     })));

    //     // return next({
    //     //     type: action.type,
    //     //     payload: action.payload.func(),
    //     //     params: action.params
    //     // });
    // }
    return next(action);
};