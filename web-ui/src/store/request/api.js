import { SERVER_URL, METHOD_POST, METHOD_PUT } from '../constants/api';
import { headersAuthSendReceiveJson } from '../../store/headers';
import { apiHandleResponse } from '../../util/api';

const list = () => {
    return fetch(`${SERVER_URL}/v1/videoKYC/requests/active`, {
        headers: headersAuthSendReceiveJson(),
    }).then(apiHandleResponse);
};

const create = ({ formData }) => {
    return fetch(`${SERVER_URL}/v1/videoKYC/requests/`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(formData),
    }).then(apiHandleResponse);
};

const update = ({ id, formData }) => {
    return fetch(`${SERVER_URL}/v1/videoKYC/requests/${id}/`, {
        method: METHOD_PUT,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(formData),
    }).then(apiHandleResponse);
};

const kycList = (id) => {
    return fetch(`${SERVER_URL}/v1/videoKYC/requests/?id=${id}`, {
        headers: headersAuthSendReceiveJson(),
    }).then(apiHandleResponse);
};

export { create, list, kycList, update };
