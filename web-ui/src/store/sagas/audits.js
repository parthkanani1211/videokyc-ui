import { takeEvery, put, call } from 'redux-saga/effects';
import * as actions from '../actions/audits.js';
import * as API from '../api/audits';

function* list() {
    try {
        yield put({ type: actions.AUDIT_LIST_PENDING });
        const approved = yield call(API.getAudits, 'approved');
        const rejected = yield call(API.getAudits, 'rejected');
        const pending = yield call(API.getAudits, 'pending_approval');

        const payload = { approved, rejected, pending };

        yield put({ type: actions.AUDIT_LIST_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({ type: actions.AUDIT_LIST_REJECTED, payload: errorMessage });
        //yield call(sessionErrorHandling, error);
    }
}

function* getAuditDetail(body) {
    const id = body.data;

    try {
        yield put({ type: actions.AUDIT_DETAIL_PENDING, id });
        const payload = yield call(API.getAuditDetail, id);
        yield put({
            type: actions.AUDIT_DETAIL_SUCCESS,
            payload,
            id,
        });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: ' ',
        };
        yield put({
            type: actions.AUDIT_DETAIL_FAILED,
            payload: errorMessage,
            id,
        });
        // yield call(sessionErrorHandling, error);
    }
}

export default function* () {
    yield takeEvery(actions.AUDIT_LIST, list);
    yield takeEvery(actions.AUDIT_DETAIL, getAuditDetail);
}
