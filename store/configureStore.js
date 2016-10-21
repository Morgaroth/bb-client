import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import rootReducer from "../reducers";
import socketMiddleware from "../middleware/socketIOMiddleware";


export default function configureStore(initialState) {


    function reducer(state = {}, action){
        switch(action.type){
            case 'message':
                return Object.assign({}, {message:action.data});
            default:
                return state;
        }
    }

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunkMiddleware, socketMiddleware, createLogger())
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
