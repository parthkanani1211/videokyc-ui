import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducers';
import thunk from 'redux-thunk';

import { reduxSagaMiddleware, initSagas } from './sagas.js';

export default function configureStore(initialState = {}) {
    const reduxThunkMiddleware = thunk;

    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const middleware = composeEnhancers(
        applyMiddleware(reduxSagaMiddleware, reduxThunkMiddleware)
    );

    const store = createStore(rootReducer, initialState, middleware);

    initSagas();

    return store;
}
