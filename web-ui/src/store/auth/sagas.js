import { all } from 'redux-saga/effects';

import login from './login/sagas';
import authentication from './authentication/sagas';

export default function* rootSaga() {
    yield all([login, authentication]);
}
