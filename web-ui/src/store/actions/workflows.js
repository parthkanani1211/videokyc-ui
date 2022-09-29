export const WORKFLOWS_LIST = 'WORKFLOWS_LIST';
export const WORKFLOWS_LIST_PENDING = 'WORKFLOWS_LIST_PENDING';
export const WORKFLOWS_LIST_FULFILLED = 'WORKFLOWS_LIST_FULFILLED';
export const WORKFLOWS_LIST_REJECTED = 'WORKFLOWS_LIST_REJECTED';

export const WORKFLOWS_GET = 'WORKFLOWS_GET';
export const WORKFLOWS_GET_PENDING = 'WORKFLOWS_GET_PENDING';
export const WORKFLOWS_GET_FULFILLED = 'WORKFLOWS_GET_FULFILLED';
export const WORKFLOWS_GET_REJECTED = 'WORKFLOWS_GET_REJECTED';

export const WORKFLOWS_CREATE = 'WORKFLOWS_CREATE';
export const WORKFLOWS_CREATE_PENDING = 'WORKFLOWS_CREATE_PENDING';
export const WORKFLOWS_CREATE_FULFILLED = 'WORKFLOWS_CREATE_FULFILLED';
export const WORKFLOWS_CREATE_REJECTED = 'WORKFLOWS_CREATE_REJECTED';

export const WORKFLOWS_UPDATE = 'WORKFLOWS_UPDATE';
export const WORKFLOWS_UPDATE_PENDING = 'WORKFLOWS_UPDATE_PENDING';
export const WORKFLOWS_UPDATE_FULFILLED = 'WORKFLOWS_UPDATE_FULFILLED';
export const WORKFLOWS_UPDATE_REJECTED = 'WORKFLOWS_UPDATE_REJECTED';

export const WORKFLOWS_DELETE = 'WORKFLOWS_DELETE';
export const WORKFLOWS_DELETE_PENDING = 'WORKFLOWS_DELETE_PENDING';
export const WORKFLOWS_DELETE_FULFILLED = 'WORKFLOWS_DELETE_FULFILLED';
export const WORKFLOWS_DELETE_REJECTED = 'WORKFLOWS_DELETE_REJECTED';

export const WORKFLOWS_ERROR_RESET = 'WORKFLOWS_ERROR_RESET';
export const WORKFLOWS_RESET = 'WORKFLOWS_RESET';

export const list = () => ({
    type: WORKFLOWS_LIST,
});

export const get = (userId, callback) => ({
    type: WORKFLOWS_GET,
    payload: { userId, callback },
});

export const create = (user, callback) => ({
    type: WORKFLOWS_CREATE,
    payload: { user, callback },
});

export const update = (id, user, callback) => ({
    type: WORKFLOWS_UPDATE,
    payload: { id, user, callback },
});

export const deleteWorkflow = (id, callback) => ({
    type: WORKFLOWS_DELETE,
    payload: { id, callback },
});

export const errorReset = (...errorKeys) => ({
    type: WORKFLOWS_ERROR_RESET,
    payload: { errorKeys },
});
