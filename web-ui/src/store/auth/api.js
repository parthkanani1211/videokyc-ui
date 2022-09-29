import { SERVER_URL, METHOD_POST, METHOD_GET } from '../constants/api';
import { headersAuthSendReceiveJson } from '../../store/headers';
import { apiHandleResponse } from '../../util/api';

const login = ({ formData }) => {
    return fetch(`${SERVER_URL}/v1/authentication/login/?`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(formData),
    }).then(apiHandleResponse);
};

const authenticate = ({ formData }) => {
    const bodyData = {
        mobileNumber: formData.mobileNumber,
        otpCode: formData.otp,
        refId: formData.refId,
    };

    return fetch(`${SERVER_URL}/v1/authentication/validateOtp/?`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(bodyData),
    }).then(apiHandleResponse);
};

const me = () => {
    return fetch(`${SERVER_URL}/v1/users/me`, {
        method: METHOD_GET,
        headers: headersAuthSendReceiveJson(),
    }).then(apiHandleResponse);
};

export { login, authenticate, me };
