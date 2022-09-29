import { METHOD_GET, SERVER_URL } from '../constants/api';
import { headersAuthReceiveJson } from '../../store/headers';
import { apiHandleResponse } from '../../util/api';

const getRoles = () => {
    return fetch(`${SERVER_URL}/v1/roles/list`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

export { getRoles };
