import { takeEvery, put, call } from 'redux-saga/effects';
import {
    GET_REQUEST_LIST,
    GET_REQUEST_LIST_PENDING,
    GET_REQUEST_LIST_FULFILLED,
    GET_REQUEST_LIST_REJECTED,
} from './constants';
import * as API from '../api';
import { LOGIN_TYPE } from '../../constants/videoKyc';

function* list(body) {
    try {
        yield put({ type: GET_REQUEST_LIST_PENDING });
        let payload;
        if (body.formData?.id || body.formData?.role === LOGIN_TYPE.CUSTOMER) {
            payload = yield call(API.kycList, body.formData.id);
        } else {
            payload = yield call(API.list, body);
        }
        yield put({
            type: GET_REQUEST_LIST_FULFILLED,
            payload,
        });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: GET_REQUEST_LIST_REJECTED,
            payload: errorMessage,
        });
    }
}

export default function* () {
    yield takeEvery(GET_REQUEST_LIST, list);
}
