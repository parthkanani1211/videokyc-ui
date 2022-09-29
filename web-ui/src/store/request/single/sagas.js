import { takeEvery, put, call } from 'redux-saga/effects';
import {
    CREATE_REQUEST,
    CREATE_REQUEST_PENDING,
    CREATE_REQUEST_FULFILLED,
    CREATE_REQUEST_REJECTED,
    UPDATE_REQUEST,
    UPDATE_REQUEST_PENDING,
    UPDATE_REQUEST_FULFILLED,
    UPDATE_REQUEST_REJECTED,
} from './constants';
import * as API from '../api';

function* create(body) {
    try {
        yield put({ type: CREATE_REQUEST_PENDING });
        const payload = yield call(API.create, body);
        yield put({
            type: CREATE_REQUEST_FULFILLED,
            payload,
        });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: CREATE_REQUEST_REJECTED,
            payload: errorMessage,
        });
    }
}

function* update(body) {
    const { formData, ...restBody } = body;
    const { updateToStore, ...rest } = formData;

    const newBody = {
        ...restBody,
        formData: rest,
    };

    try {
        yield put({ type: UPDATE_REQUEST_PENDING, updateToStore });
        const payload = yield call(API.update, newBody);
        yield put({
            type: UPDATE_REQUEST_FULFILLED,
            payload,
            updateToStore,
        });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: UPDATE_REQUEST_REJECTED,
            payload: errorMessage,
            updateToStore,
        });
    }
}

export default function* () {
    yield takeEvery(CREATE_REQUEST, create);
    yield takeEvery(UPDATE_REQUEST, update);
}
