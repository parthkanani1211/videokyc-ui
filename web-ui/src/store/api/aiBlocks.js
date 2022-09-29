import {
    METHOD_GET,
    METHOD_POST,
    METHOD_PUT,
    METHOD_DELETE,
    SERVER_URL,
} from '../constants/api';
import {
    headersAuthReceiveJson,
    headersAuthSendReceiveJson,
    headersAuth,
} from '../headers';
import { apiHandleResponse } from '../../util/api';

const getAiBlocks = () => {
    return fetch(`${SERVER_URL}/api/v1/aiblocks/`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

const getAiBlock = (aiBlockId) => {
    return fetch(`${SERVER_URL}/api/v1/aiblocks/${aiBlockId}`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

const createAiBlock = (aiBlock) => {
    return fetch(`${SERVER_URL}/api/v1/aiblocks`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(aiBlock),
    }).then(apiHandleResponse);
};

const updateAiBlock = (aiBlockId, aiBlock) => {
    return fetch(`${SERVER_URL}/api/v1/aiblocks/${aiBlockId}`, {
        method: METHOD_PUT,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(aiBlock),
    }).then(apiHandleResponse);
};

const deleteAiBlock = (aiBlockId) => {
    return fetch(`${SERVER_URL}/api/v1/aiblocks/${aiBlockId}`, {
        method: METHOD_DELETE,
        headers: headersAuth(),
    }).then(apiHandleResponse);
};

export { getAiBlocks, createAiBlock, updateAiBlock, getAiBlock, deleteAiBlock };
