import sagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';

export const reduxSagaMiddleware = sagaMiddleware();

export function initSagas() {
    reduxSagaMiddleware.run(function* sagas() {
        yield fork(require('./sagas/session').default);
        yield fork(require('./sagas/users').default);
        yield fork(require('./sagas/roles').default);
        yield fork(require('./sagas/aiBlocks').default);
        yield fork(require('./sagas/workflows').default);
        yield fork(require('./sagas/videoKyc').default);
        yield fork(require('./sagas/audits').default);
        yield fork(require('./auth/login/sagas').default);
        yield fork(require('./auth/authentication/sagas').default);
        yield fork(require('./request/single/sagas').default);
        yield fork(require('./request/list/sagas').default);
        yield fork(require('./organization/sagas').default);
    });
}
