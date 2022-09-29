import { takeEvery, put, call } from 'redux-saga/effects';
import * as actions from '../actions/roles';
import * as API from '../api/roles';
import { sessionErrorHandling } from './session';

function* list() {
    try {
        yield put({ type: actions.ROLES_LIST_PENDING });
        const payload = yield call(API.getRoles);
        yield put({ type: actions.ROLES_LIST_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({ type: actions.ROLES_LIST_REJECTED, payload: errorMessage });
        yield call(sessionErrorHandling, error);
    }
}

export function* reset() {
    yield put({ type: actions.ROLES_RESET });
}

export default function* () {
    yield takeEvery(actions.ROLES_LIST, list);
}
