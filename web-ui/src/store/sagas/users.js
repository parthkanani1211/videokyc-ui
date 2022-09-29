import { takeEvery, put, call } from 'redux-saga/effects';
import * as actions from '../actions/users';
import * as API from '../api/users';
import { sessionErrorHandling } from './session';

function* list() {
    try {
        yield put({ type: actions.USERS_LIST_PENDING });
        const payload = yield call(API.getUsers);
        yield put({ type: actions.USERS_LIST_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({ type: actions.USERS_LIST_REJECTED, payload: errorMessage });
        yield call(sessionErrorHandling, error);
    }
}

function* listTiny(action) {
    try {
        yield put({ type: actions.USERS_LIST_TINY_PENDING });
        const { clientId } = action.payload;
        const payload = yield call(API.getUsersTiny, clientId);
        yield put({ type: actions.USERS_LIST_TINY_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.USERS_LIST_TINY_REJECTED,
            payload: errorMessage,
        });
        yield call(sessionErrorHandling, error);
    }
}

function* get(action) {
    try {
        yield put({ type: actions.USERS_GET_PENDING });
        const { userId, callback } = action.payload;
        const payload = yield call(API.getUser, userId);
        yield put({ type: actions.USERS_GET_FULFILLED, payload });

        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({ type: actions.USERS_GET_REJECTED, payload: errorMessage });
        yield call(sessionErrorHandling, error);
    }
}

function* create(action) {
    try {
        yield put({ type: actions.USERS_CREATE_PENDING });
        const { user, callback } = action.payload;

        const payload = {
            ...user,
        };
        const newUser = yield call(API.createUser, payload);
        yield put({ type: actions.USERS_CREATE_FULFILLED, newUser });

        if (callback) {
            callback();
        }
    } catch (error) {
        const { message: errorMessage, errors } = (error && error.payload) || {
            message: '',
            errors: []
        };
        yield put({
            type: actions.USERS_CREATE_REJECTED,
            payload: errors?.[0]?.defaultMessage || errorMessage,
        });
        yield call(sessionErrorHandling, error);
    }
}

function* register(action) {
    try {
        yield put({ type: actions.REGISTER_ADMIN_PENDING });
        const { user, callback } = action.payload;

        const payload = {
            ...user,
        };
        const newUser = yield call(API.registerAdmin, payload);
        yield put({ type: actions.REGISTER_ADMIN_FULFILLED, newUser });

        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.REGISTER_ADMIN_REJECTED,
            payload: errorMessage,
        });
        yield call(sessionErrorHandling, error);
    }
}

function* update(action) {
    try {
        yield put({ type: actions.USERS_UPDATE_PENDING });
        const { id, user, callback } = action.payload;

        yield call(API.updateUser, id, user);
        yield put({ type: actions.USERS_UPDATE_FULFILLED });

        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.USERS_UPDATE_REJECTED,
            payload: errorMessage,
        });
        yield call(sessionErrorHandling, error);
    }
}

function* deleteUser(action) {
    try {
        yield put({ type: actions.USERS_DELETE_PENDING });
        const { id, callback } = action.payload;
        yield call(API.deleteUser, id);
        yield put({ type: actions.USERS_DELETE_FULFILLED, payload: { id } });
        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.USERS_DELETE_REJECTED,
            payload: errorMessage,
        });
        yield call(sessionErrorHandling, error);
    }
}

export function* reset() {
    yield put({ type: actions.USERS_RESET });
}

export default function* () {
    yield takeEvery(actions.USERS_LIST, list);
    yield takeEvery(actions.USERS_LIST_TINY, listTiny);
    yield takeEvery(actions.USERS_CREATE, create);
    yield takeEvery(actions.REGISTER_ADMIN, register);
    yield takeEvery(actions.USERS_UPDATE, update);
    yield takeEvery(actions.USERS_GET, get);
    yield takeEvery(actions.USERS_DELETE, deleteUser);
}
