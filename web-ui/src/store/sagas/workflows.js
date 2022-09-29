import { takeEvery, put, call } from 'redux-saga/effects';
import * as actions from '../actions/workflows';
import * as API from '../api/workflows';
import { sessionErrorHandling } from './session';

function* list() {
    try {
        yield put({ type: actions.WORKFLOWS_LIST_PENDING });
        const payload = yield call(API.getWorkflows);
        yield put({ type: actions.WORKFLOWS_LIST_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.WORKFLOWS_LIST_REJECTED,
            payload: errorMessage,
        });
        yield call(sessionErrorHandling, error);
    }
}

function* get(action) {
    try {
        yield put({ type: actions.WORKFLOWS_GET_PENDING });
        const { workflowId, callback } = action.payload;
        const payload = yield call(API.getWorkflow, workflowId);
        yield put({ type: actions.WORKFLOWS_GET_FULFILLED, payload });

        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.WORKFLOWS_GET_REJECTED,
            payload: errorMessage,
        });
        yield call(sessionErrorHandling, error);
    }
}

function* create(action) {
    try {
        yield put({ type: actions.WORKFLOWS_CREATE_PENDING });
        const { workflow, callback } = action.payload;

        const payload = {
            ...workflow,
        };
        const newWorkflow = yield call(API.createWorkflow, payload);
        yield put({ type: actions.WORKFLOWS_CREATE_FULFILLED, newWorkflow });

        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.WORKFLOWS_CREATE_REJECTED,
            payload: errorMessage,
        });
        yield call(sessionErrorHandling, error);
    }
}

function* update(action) {
    try {
        yield put({ type: actions.WORKFLOWS_UPDATE_PENDING });
        const { id, workflow, callback } = action.payload;

        yield call(API.updateWorkflow, id, workflow);
        yield put({ type: actions.WORKFLOWS_UPDATE_FULFILLED });

        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.WORKFLOWS_UPDATE_REJECTED,
            payload: errorMessage,
        });
        yield call(sessionErrorHandling, error);
    }
}

function* deleteWorkflow(action) {
    try {
        yield put({ type: actions.WORKFLOWS_DELETE_PENDING });
        const { id, callback } = action.payload;
        yield call(API.deleteWorkflow, id);
        yield put({
            type: actions.WORKFLOWS_DELETE_FULFILLED,
            payload: { id },
        });
        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.WORKFLOWS_DELETE_REJECTED,
            payload: errorMessage,
        });
        yield call(sessionErrorHandling, error);
    }
}

export function* reset() {
    yield put({ type: actions.WORKFLOWS_RESET });
}

export default function* () {
    yield takeEvery(actions.WORKFLOWS_LIST, list);
    yield takeEvery(actions.WORKFLOWS_CREATE, create);
    yield takeEvery(actions.WORKFLOWS_UPDATE, update);
    yield takeEvery(actions.WORKFLOWS_GET, get);
    yield takeEvery(actions.WORKFLOWS_DELETE, deleteWorkflow);
}
