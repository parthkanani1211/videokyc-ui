import { createSelector } from 'reselect';

import {
    selectAuthHeaders,
    selectAuthSendJsonHeaders,
    selectAuthReceiveJsonHeaders,
    selectAuthSendReceiveJsonHeaders,
    selectAuthReceiveOctetHeaders,
} from './selectors/api';
import {
    HEADERS_JSON_RECEIVE,
    HEADERS_JSON_SEND_RECEIVE,
} from './constants/api';

const HEADERS_NO_CACHE = {
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
};

function headers(getHeaders) {
    const selectHeadersNoCache = createSelector(
        selectAuthHeaders,
        (headers) => headers,
        (authHeaders, headers) => ({
            ...authHeaders,
            ...headers,
            ...HEADERS_NO_CACHE,
        })
    );
    return (extraHeaders) => {
        let headers = selectHeadersNoCache(getHeaders());

        //HACK - as the selector is not refreshing the auth code.
        const authHeader = selectAuthHeaders();
        if (extraHeaders) {
            const initialHeaders = headers;
            Object.entries(extraHeaders).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (headers === initialHeaders) {
                        headers = { ...headers };
                    }
                    headers[key] = value;
                }
            });
        }
        return {
            ...headers,
            ...authHeader,
        };
    };
}

export const headersAuth = headers(selectAuthHeaders);
export const headersAuthSendJson = headers(selectAuthSendJsonHeaders);
export const headersAuthReceiveJson = headers(selectAuthReceiveJsonHeaders);
export const headersAuthSendReceiveJson = headers(
    selectAuthSendReceiveJsonHeaders
);
export const headersReceiveJson = headers(() => HEADERS_JSON_RECEIVE);
export const headersSendReceiveJson = headers(() => HEADERS_JSON_SEND_RECEIVE);
export const headersAuthReceiveOctet = headers(selectAuthReceiveOctetHeaders);
