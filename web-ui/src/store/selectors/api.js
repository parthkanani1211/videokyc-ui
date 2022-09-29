import { createSelector } from 'reselect';
import { fromLocalStorage } from '../../util/storage';
import { getOrganizationId } from '../../router/RouterHelpers';

import {
    HEADERS_JSON_SEND,
    HEADERS_JSON_RECEIVE,
    HEADERS_JSON_SEND_RECEIVE,
    HEADERS_OCTET_RECEIVE,
} from '../constants/api';

// export const selectAuthHeaders = createSelector(
//     () => fromLocalStorage('authToken', null),
//     (authToken) => {
//         if (authToken) {
//             return {'Authorization': `Bearer ${authToken}`};
//         }
//         return {'Authorization': 'NULL'};
//     }
// );

export const selectAuthHeaders = () => {
    const authToken = fromLocalStorage('authToken', null);

    const headers = {
        'x-obvs-org': getOrganizationId(),
    };

    if (authToken) {
        headers['X-Authorization'] = authToken;
    }

    return headers;
};

const selectAuthHeadersMerge = (baseHeaders) =>
    createSelector(selectAuthHeaders, (headers) => ({
        ...baseHeaders,
        ...headers,
    }));

export const selectAuthSendJsonHeaders = selectAuthHeadersMerge(
    HEADERS_JSON_SEND
);
export const selectAuthReceiveJsonHeaders = selectAuthHeadersMerge(
    HEADERS_JSON_RECEIVE
);
export const selectAuthSendReceiveJsonHeaders = selectAuthHeadersMerge(
    HEADERS_JSON_SEND_RECEIVE
);

export const selectAuthReceiveOctetHeaders = selectAuthHeadersMerge(HEADERS_OCTET_RECEIVE);
