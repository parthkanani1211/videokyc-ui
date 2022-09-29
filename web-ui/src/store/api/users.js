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
} from '../../store/headers';
import { apiHandleResponse } from '../../util/api';

const getUsers = () => {
    return fetch(`${SERVER_URL}/v1/users/list`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

const createUser = (user) => {
    return fetch(`${SERVER_URL}/v1/users/create`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(user),
    }).then(apiHandleResponse);
};

const registerAdmin = (user) => {
    return fetch(`${SERVER_URL}/v1/users/create/admin`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(user),
    }).then(apiHandleResponse);
};

const updateUser = (userId, user) => {
    console.log(user);
    return fetch(`${SERVER_URL}/v1/users/update/${userId}`, {
        method: METHOD_PUT,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(user),
    }).then(apiHandleResponse);
};

const deleteUser = (userId) => {
    return fetch(`${SERVER_URL}/v1/users/delete/${userId}`, {
        method: METHOD_DELETE,
        headers: headersAuth(),
    }).then(apiHandleResponse);
};

const getUser = (userId) => {
    return fetch(`${SERVER_URL}/v1/users/${userId}`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

// Get users by ClientId. A tiny list of id and name
const getUsersTiny = (clientId) => {
    return fetch(`${SERVER_URL}/api/v1/users/tiny/${clientId}`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};



const getRoles = () => {
    return fetch(`${SERVER_URL}/api/v1/users/roles`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};



export {
    getUsers,
    getUsersTiny,
    registerAdmin,
    createUser,
    updateUser,
    getRoles,
    getUser,
    deleteUser,
};
