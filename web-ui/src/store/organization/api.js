import {METHOD_GET, SERVER_URL} from '../constants/api';
import { apiHandleResponse } from '../../util/api';
import {headersAuth, headersAuthReceiveJson, headersAuthSendReceiveJson} from '../../store/headers';

const get = (subDomain) => {
    return fetch(`${SERVER_URL}/v1/orgs/?orgName=${subDomain}`, {
        headers: headersAuthSendReceiveJson(),
    }).then(apiHandleResponse);
};

const adminExist = () => {
    return fetch(`${SERVER_URL}/v1/users/admin`, {
        method: METHOD_GET,
        headers: headersAuth(),
    }).then(apiHandleResponse);
};

export { get, adminExist };
