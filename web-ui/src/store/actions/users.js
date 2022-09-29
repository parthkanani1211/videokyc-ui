export const USERS_LIST = 'USERS_LIST';
export const USERS_LIST_PENDING = 'USERS_LIST_PENDING';
export const USERS_LIST_FULFILLED = 'USERS_LIST_FULFILLED';
export const USERS_LIST_REJECTED = 'USERS_LIST_REJECTED';

export const USERS_LIST_TINY = 'USERS_LIST_TINY';
export const USERS_LIST_TINY_PENDING = 'USERS_LIST_TINY_PENDING';
export const USERS_LIST_TINY_FULFILLED = 'USERS_LIST_TINY_FULFILLED';
export const USERS_LIST_TINY_REJECTED = 'USERS_LIST_TINY_REJECTED';

export const USERS_GET = 'USERS_GET';
export const USERS_GET_PENDING = 'USERS_GET_PENDING';
export const USERS_GET_FULFILLED = 'USERS_GET_FULFILLED';
export const USERS_GET_REJECTED = 'USERS_GET_REJECTED';

export const USERS_CREATE_START = 'USERS_CREATE_START';
export const USERS_CREATE = 'USERS_CREATE';
export const USERS_CREATE_PENDING = 'USERS_CREATE_PENDING';
export const USERS_CREATE_FULFILLED = 'USERS_CREATE_FULFILLED';
export const USERS_CREATE_REJECTED = 'USERS_CREATE_REJECTED';

export const USERS_UPDATE_START = 'USERS_UPDATE_START';
export const USERS_UPDATE = 'USERS_UPDATE';
export const USERS_UPDATE_PENDING = 'USERS_UPDATE_PENDING';
export const USERS_UPDATE_FULFILLED = 'USERS_UPDATE_FULFILLED';
export const USERS_UPDATE_REJECTED = 'USERS_UPDATE_REJECTED';

export const USERS_DELETE = 'USERS_DELETE';
export const USERS_DELETE_PENDING = 'USERS_DELETE_PENDING';
export const USERS_DELETE_FULFILLED = 'USERS_DELETE_FULFILLED';
export const USERS_DELETE_REJECTED = 'USERS_DELETE_REJECTED';

export const USERS_ERROR_RESET = 'USERS_ERROR_RESET';
export const USERS_RESET = 'USERS_RESET';

export const REGISTER_ADMIN = 'REGISTER_ADMIN';
export const REGISTER_ADMIN_PENDING = 'REGISTER_ADMIN_PENDING';
export const REGISTER_ADMIN_FULFILLED = 'REGISTER_ADMIN_FULFILLED';
export const REGISTER_ADMIN_REJECTED = 'REGISTER_ADMIN_REJECTED';

export const list = () => ({
    type: USERS_LIST,
});

export const listTiny = (clientId) => ({
    type: USERS_LIST_TINY,
    payload: { clientId },
});

export const get = (userId, callback) => ({
    type: USERS_GET,
    payload: { userId, callback },
});

export const create = (user, callback) => ({
    type: USERS_CREATE,
    payload: { user, callback },
});

export const startCreate = () => {
    return {
        type: USERS_CREATE_START,
    }
};

export const register = (user, callback) => ({
    type: REGISTER_ADMIN,
    payload: { user, callback },
});

export const update = (id, user, callback) => ({
    type: USERS_UPDATE,
    payload: { id, user, callback },
});

export const startUpdate = () => {
    return {
        type: USERS_UPDATE_START,
    }
};

export const deleteUser = (id, callback) => ({
    type: USERS_DELETE,
    payload: { id, callback },
});

export const errorReset = (...errorKeys) => ({
    type: USERS_ERROR_RESET,
    payload: { errorKeys },
});
