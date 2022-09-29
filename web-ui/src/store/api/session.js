import { METHOD_POST, METHOD_GET, SERVER_URL } from '../constants/api';
import {
    headersSendReceiveJson,
    headersAuthReceiveJson,
    headersAuthSendReceiveJson,
} from '../../store/headers';

import { apiHandleResponse } from '../../util/api';

const login = (mobileNumber = '') => {
    return fetch(`${SERVER_URL}/v1/authentication/login/?`, {
        method: METHOD_POST,
        headers: headersSendReceiveJson(),
        body: JSON.stringify({ mobileNumber }),
    }).then(apiHandleResponse);
};

const validateOtp = (payload) => {
    return fetch(`${SERVER_URL}/v1/authentication/validateOtp/?`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(payload),
    }).then(apiHandleResponse);
};

const getCurrentUser = () => {
    return fetch(`${SERVER_URL}/v1/users/me`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

const getUserProfile = () => {
    return fetch(`${SERVER_URL}/v1/customer/profile`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

const changePassword = (oldPassword = '', newPassword = '') => {
    return fetch(`${SERVER_URL}/api/v1/user/password`, {
        method: METHOD_POST,
        headers: headersSendReceiveJson(),
        body: JSON.stringify({ oldPassword, newPassword }),
    }).then(apiHandleResponse);
};

export { login, getCurrentUser, changePassword, validateOtp, getUserProfile };
