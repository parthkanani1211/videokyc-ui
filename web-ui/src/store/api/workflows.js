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

const getWorkflows = () => {
    return fetch(`${SERVER_URL}/api/v1/workflows/list`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

const getWorkflow = (workflowId) => {
    return fetch(`${SERVER_URL}/api/v1/workflows/${workflowId}`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

const createWorkflow = (workflow) => {
    return fetch(`${SERVER_URL}/api/v1/workflows`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(workflow),
    }).then(apiHandleResponse);
};

const updateWorkflow = (workflowId, workflow) => {
    return fetch(`${SERVER_URL}/api/v1/workflows/${workflowId}`, {
        method: METHOD_PUT,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(workflow),
    }).then(apiHandleResponse);
};

const deleteWorkflow = (workflowId) => {
    return fetch(`${SERVER_URL}/api/v1/workflows/${workflowId}`, {
        method: METHOD_DELETE,
        headers: headersAuth(),
    }).then(apiHandleResponse);
};

export {
    getWorkflows,
    createWorkflow,
    updateWorkflow,
    getWorkflow,
    deleteWorkflow,
};
