import { METHOD_POST, SERVER_URL, METHOD_GET } from '../constants/api';
import { headersAuth, headersAuthSendReceiveJson, headersAuthSendJson, headersAuthReceiveJson, headersAuthReceiveOctet } from '../../store/headers';
import { apiHandleResponse, apiHandleOctetResponse } from '../../util/api';

const extract = ({ requestId, formData }) => {
    return fetch(`${SERVER_URL}/v1/videoKYC/requests/${requestId}`, {
        method: METHOD_POST,
        headers: headersAuth(),
        body: formData,
    }).then(apiHandleResponse);
};

const verify = (verifyType, data, requestId) => {
    return fetch(`${SERVER_URL}/v1/videoKYC/requests/${requestId}/kyc/${verifyType}/verify`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(data),
    }).then(apiHandleResponse);
};

const confirmOtp = (requestId, otp) => {
    return fetch(`${SERVER_URL}/v1/videoKYC/requests/${requestId}/kyc/aadhar/validate-otp`, {
        method: METHOD_POST,
        headers: headersAuthSendJson(),
        body: JSON.stringify(otp),
    }).then(apiHandleResponse);
};

const getGeoLocation = (requestId, geoLocation) => {
    return fetch(`${SERVER_URL}/v1/videoKYC/requests/${requestId}/location`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(geoLocation),
    }).then(apiHandleResponse);
};

const getKycStatus = (requestId) => {
    return fetch(`${SERVER_URL}/v1/videoKYC/requests/${requestId}/kyc/completed`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

const aadharVerify = (requestId) => {
    return fetch(`${SERVER_URL}/v1/videoKYC/requests/${requestId}/kyc/aadhar/verifydata`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

const getToken = (payload) => {
    return fetch(`${SERVER_URL}/v1/openvidu/get-token`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(payload),
    }).then(apiHandleResponse);
};

const getSession = (payload) => {
    return fetch(`${SERVER_URL}/v1/openvidu/fetch-info`, {
        method: METHOD_POST,
        headers: headersAuthReceiveJson(),
        body: JSON.stringify(payload),
    }).then(apiHandleResponse);
};

const downloadRecording = (requestId) => {
    return fetch(`${SERVER_URL}/v1/videoKYC/requests/${requestId}/recording/download`, {
        method: METHOD_GET,
        headers: headersAuthReceiveOctet(),
    }).then(apiHandleOctetResponse);
};

export {
    verify, getGeoLocation, getKycStatus,
    getSession, getToken, extract, confirmOtp, aadharVerify,
    downloadRecording,
};
