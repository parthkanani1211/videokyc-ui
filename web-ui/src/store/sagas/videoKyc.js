import { takeEvery, put, call } from 'redux-saga/effects';
import * as actions from '../actions/videoKyc.js';
import * as API from '../api/videoKyc.js';
import { sessionErrorHandling } from './session';

function* extract({ payload: body }) {
    const { formData, callback } = body;
    const kycType = formData.get('kycType');

    try {
        yield put({ type: actions.VIDEO_KYC_EXTRACT_PENDING, kycType });
        const payload = yield call(API.extract, body);
        yield put({
            type: actions.VIDEO_KYC_EXTRACT_FULFILLED,
            payload,
            kycType,
        });

        if(callback) {
            callback(kycType);
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.VIDEO_KYC_EXTRACT_REJECTED,
            payload: errorMessage,
            kycType,
        });
    }
}

function* verify(action) {
    try {
        const { verifyType, data, requestId, callback } = action.payload;
        yield put({ 
            type: actions.VIDEO_KYC_VERIFY_PENDING,
            payload: {},
            verifyType,
        });
        const payload = yield call(API.verify, verifyType, data, requestId);
        console.log(payload)
        yield put({
            type: actions.VIDEO_KYC_VERIFY_FULFILLED,
            payload,
            verifyType,
        });

        if (callback) {
            callback();
        }

    } catch (error) {
        const { message: errorMessage } = (error && error.payload) || {
            error: '',
        };
        const { verifyType} = action.payload;
        yield put({
            type: actions.VIDEO_KYC_VERIFY_REJECTED,
            payload: errorMessage,
            verifyType,
        });
    }
}

function* confirmOtp(action) {
    try {
        const { otp, requestId, callback } = action.payload;
        yield put({ type: actions.VIDEO_KYC_CONFIRM_OTP_PENDING });
        const payload = yield call(API.confirmOtp, requestId, otp);
        yield put({
            type: actions.VIDEO_KYC_CONFIRM_OTP_FULFILLED,
            payload,
        });
        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.VIDEO_KYC_CONFIRM_OTP_REJECTED,
            payload: errorMessage,
        });
    }
}

function* getGeoLocation(action) {
    try {
        yield put({ type: actions.VIDEO_KYC_GEO_LOCATION_PENDING });
        const { requestId, longitude, latitude } = action.payload;
        const payload = yield call(API.getGeoLocation, requestId, {
            latitude,
            longitude,
        });
        yield put({ type: actions.VIDEO_KYC_GEO_LOCATION_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.VIDEO_KYC_GEO_LOCATION_REJECTED,
            payload: errorMessage,
        });
    }
}

function* getKycStatus(action) {
    try {
        yield put({ type: actions.VIDEO_KYC_GET_STATUS_PENDING });
        const { requestId } = action.payload;
        const payload = yield call(API.getKycStatus, requestId);
        yield put({ type: actions.VIDEO_KYC_GET_STATUS_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.VIDEO_KYC_GET_STATUS_REJECTED,
            payload: errorMessage,
        });
    }
}
function* aadharVerify(action) {
    try {
        const { callback, requestId } = action.payload;
        yield put({ type: actions.VIDEO_KYC_AADHAR_VERIFY_PENDING });
        const payload = yield call(API.aadharVerify, requestId);
        console.log(payload)
        yield put({ type: actions.VIDEO_KYC_AADHAR_VERIFY_FULFILLED, payload });

        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({ type: actions.VIDEO_KYC_AADHAR_VERIFY_REJECTED, payload: errorMessage });
    }
}

function* getToken(action) {
    try {
        const { sessionId, callback } = action.payload;
        yield put({ type: actions.VIDEO_KYC_GET_TOKEN_PENDING });
        const payload = yield call(API.getToken, { sessionName: sessionId });
        yield put({ type: actions.VIDEO_KYC_GET_TOKEN_FULFILLED, payload });

        if (callback) {
            callback();
        }

    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.VIDEO_KYC_GET_TOKEN_REJECTED,
            payload: errorMessage,
        });
        yield call(sessionErrorHandling, error);
    }
}

function* getSession(action) {
    try {
        const { sessionId, callback } = action.payload;
        yield put({ type: actions.VIDEO_KYC_GET_SESSION_PENDING });
        const payload = yield call(API.getSession, { sessionName: sessionId });
        yield put({ type: actions.VIDEO_KYC_GET_SESSION_FULFILLED, payload });

        if (callback) {
            callback();
        }

    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.VIDEO_KYC_GET_SESSION_REJECTED,
            payload: errorMessage,
        });
        yield call(sessionErrorHandling, error);
    }
}

function* downloadRecording(action) {
    try {
        const { requestId, callback } = action.payload;
        yield put({ type: actions.VIDEO_KYC_DOWNLOAD_RECORDING_PENDING });
        const payload = yield call(API.downloadRecording, requestId);
        yield put({
            type: actions.VIDEO_KYC_DOWNLOAD_RECORDING_FULFILLED,
        });
        if (callback) {
            callback(payload);
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.VIDEO_KYC_DOWNLOAD_RECORDING_REJECTED,
            payload: errorMessage,
        });
    }
}

export default function* () {
    yield takeEvery(actions.VIDEO_KYC_EXTRACT, extract);
    yield takeEvery(actions.VIDEO_KYC_VERIFY, verify);
    yield takeEvery(actions.VIDEO_KYC_CONFIRM_OTP, confirmOtp);
    yield takeEvery(actions.VIDEO_KYC_AADHAR_VERIFY, aadharVerify);
    yield takeEvery(actions.VIDEO_KYC_GEO_LOCATION, getGeoLocation);
    yield takeEvery(actions.VIDEO_KYC_GET_STATUS, getKycStatus);
    yield takeEvery(actions.VIDEO_KYC_GET_TOKEN, getToken);
    yield takeEvery(actions.VIDEO_KYC_GET_SESSION, getSession);
    yield takeEvery(actions.VIDEO_KYC_DOWNLOAD_RECORDING, downloadRecording);
}
