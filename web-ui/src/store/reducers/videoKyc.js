import { reduce } from 'lodash';

import { createReducer } from '../../util';
import * as actions from '../actions/videoKyc';

import { KYC_DOCUMENT_TYPES } from '../constants/videoKyc';

const initialStatusState = {
    error: false,
    errorMessage: '',
    pending: false,
};

const initialItemState = {
    data: null,
    responseData: null,
    error: false,
    errorMessage: '',
    pending: false,
};

const initialKycState = reduce(
    KYC_DOCUMENT_TYPES,
    (result, value) => {
        const newResult = result;

        newResult[value] = initialItemState;

        return newResult;
    },
    {}
);

const initialState = {
    token: undefined,
    session: {},
    ...initialKycState,
    getToken: {
        ...initialStatusState,
    },
    getSession: {
        ...initialStatusState,
    },
    confirmOtp: {
        ...initialStatusState,
    },
    extract: {
        ...initialStatusState,
    },
    download: {
        ...initialStatusState,
    }
}

export default createReducer(initialState, {
    [actions.VIDEO_KYC_EXTRACT_PENDING]: (state, payload, { kycType }) => ({
        ...state,
        [kycType]: {
            extractPending: true,
        },
    }),
    [actions.VIDEO_KYC_EXTRACT_FULFILLED]: (state, response, { kycType }) => ({
        ...state,
        [kycType]: {
            ...initialItemState,
            data: response,
            extractPending: false,
        },
    }),
    [actions.VIDEO_KYC_EXTRACT_REJECTED]: (state, errorMessage, { kycType }) => ({
        ...state,
        [kycType]: {
            ...initialItemState,
            extractError: true,
            extractErrorMessage: errorMessage,
        },
    }),
    [actions.VIDEO_KYC_GEO_LOCATION_PENDING]: (state) => ({
        ...state,
        getGeoLocation: {
            pending: true,
        },
    }),
    [actions.VIDEO_KYC_GEO_LOCATION_FULFILLED]: (state, geoLocation) => ({
        ...state,
        getGeoLocation: {
            ...initialItemState,
        },
        geoLocation,
    }),
    [actions.VIDEO_KYC_GEO_LOCATION_REJECTED]: (state, errorMessage) => ({
        ...state,
        getGeoLocation: {
            ...initialItemState,
            error: true,
            errorMessage,
        },
    }),
    [actions.VIDEO_KYC_GET_STATUS_PENDING]: (state) => ({
        ...state,
        getKycStatus: {
            pending: true,
        },
    }),
    [actions.VIDEO_KYC_GET_STATUS_FULFILLED]: (state, status) => ({
        ...state,
        getKycStatus: {
            ...initialItemState,
        },
        status,
    }),
    [actions.VIDEO_KYC_GET_STATUS_REJECTED]: (state, errorMessage) => ({
        ...state,
        getKycStatus: {
            ...initialItemState,
            error: true,
            errorMessage,
        },
    }),
    [actions.VIDEO_KYC_GET_TOKEN_PENDING]: (state) => ({
        ...state,
        getToken: {
            pending: true,
        },
    }),
    [actions.VIDEO_KYC_GET_TOKEN_FULFILLED]: (state, token) => ({
        ...state,
        getToken: {
            ...initialStatusState,
        },
        token,
    }),
    [actions.VIDEO_KYC_GET_TOKEN_REJECTED]: (state, errorMessage) => ({
        ...state,
        getToken: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.VIDEO_KYC_GET_SESSION_PENDING]: (state) => ({
        ...state,
        getSession: {
            pending: true,
        },
    }),
    [actions.VIDEO_KYC_GET_SESSION_FULFILLED]: (state, session) => ({
        ...state,
        getSession: {
            ...initialStatusState,
        },
        session,
    }),
    [actions.VIDEO_KYC_GET_SESSION_REJECTED]: (state, errorMessage) => ({
        ...state,
        getSession: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.VIDEO_KYC_VERIFY_PENDING]: (state, response, {verifyType}) => ({
        ...state,
        [verifyType.toUpperCase()]: {
            ...state[`${verifyType.toUpperCase()}`],
            pending: true,
        },
    }),
    [actions.VIDEO_KYC_VERIFY_FULFILLED]: (state, response, {verifyType}) => ({
        ...state,
        [verifyType.toUpperCase()]: {
            ...state[`${verifyType.toUpperCase()}`],
            responseData: response,
            pending: false,
        },
    }),
    [actions.VIDEO_KYC_VERIFY_REJECTED]: (state, errorMessage, { verifyType }) => ({
        ...state,
        [verifyType.toUpperCase()]: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),

    [actions.VIDEO_KYC_CONFIRM_OTP_PENDING]: (state) => ({
        ...state,
        confirmOtp: {
            pending: true,
        },
    }),
    [actions.VIDEO_KYC_CONFIRM_OTP_FULFILLED]: (state) => ({
        ...state,
        confirmOtp: {
            ...initialItemState,
        },
    }),
    [actions.VIDEO_KYC_CONFIRM_OTP_REJECTED]: (state, errorMessage) => ({
        ...state,
        confirmOtp: {
            ...initialItemState,
            error: true,
            errorMessage,
        },
    }),
    [actions.VIDEO_KYC_AADHAR_VERIFY_PENDING]: (state) => ({
        ...state,
        AADHAR: {
            ...state.AADHAR,
            pending: true,
        },
    }),
    [actions.VIDEO_KYC_AADHAR_VERIFY_FULFILLED]: (state, response) => ({
        ...state,
        AADHAR: {
            ...state.AADHAR,
            responseData: response,
            pending: false,
            error: false,
            errorMessage: null,
        }
    }),
    [actions.VIDEO_KYC_AADHAR_VERIFY_REJECTED]: (state, errorMessage) => ({
        ...state,
        confirmOtp: {
            ...initialItemState,
            error: true,
            errorMessage,
        },
    }),
    [actions.VIDEO_KYC_DOWNLOAD_RECORDING_PENDING]: (state) => ({
        ...state,
        download: {
            pending: true,
        },
    }),
    [actions.VIDEO_KYC_DOWNLOAD_RECORDING_FULFILLED]: (state) => ({
        ...state,
        download: {
            ...initialItemState,
        },
    }),
    [actions.VIDEO_KYC_DOWNLOAD_RECORDING_REJECTED]: (state, errorMessage) => ({
        ...state,
        download: {
            ...initialItemState,
            error: true,
            errorMessage,
        },
    }),
    [actions.CLEAR_VIDEO_KYC_VERIFY]: () => initialState,
});
