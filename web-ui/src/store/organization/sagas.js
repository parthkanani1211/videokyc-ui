import { takeEvery, put, call } from 'redux-saga/effects';
import {
    GET_ORGANIZATION,
    GET_ORGANIZATION_PENDING,
    GET_ORGANIZATION_FULFILLED,
    GET_ORGANIZATION_REJECTED,
    IS_ORGANIZATION_ADMIN_EXIST_PENDING,
    IS_ORGANIZATION_ADMIN_EXIST_FULFILLED,
    IS_ORGANIZATION_ADMIN_EXIST_REJECTED, IS_ORGANIZATION_ADMIN_EXIST,
} from './constants';
import * as API from './api';
import { saveOrganizationId } from '../../router/RouterHelpers';

function* get(body) {
    try {
        yield put({ type: GET_ORGANIZATION_PENDING });

        const payload = yield call(API.get, body.subDomain);

        if (payload?.id) {
            saveOrganizationId(payload.id);
        }

        yield put({
            type: GET_ORGANIZATION_FULFILLED,
            payload,
        });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: GET_ORGANIZATION_REJECTED,
            payload: errorMessage,
        });
    }
}

function* isOrgAdminExist(action) {
    try {
        yield put({ type: IS_ORGANIZATION_ADMIN_EXIST_PENDING });
        const payload = yield call(API.adminExist);

        yield put({
            type: IS_ORGANIZATION_ADMIN_EXIST_FULFILLED,
            payload,
        });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: IS_ORGANIZATION_ADMIN_EXIST_REJECTED,
            payload: errorMessage,
        });
    }
}

export default function* () {
    yield takeEvery(GET_ORGANIZATION, get);
    yield takeEvery(IS_ORGANIZATION_ADMIN_EXIST, isOrgAdminExist);
}
