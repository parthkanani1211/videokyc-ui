export const ROLES_LIST = 'ROLES_LIST';
export const ROLES_LIST_PENDING = 'ROLES_LIST_PENDING';
export const ROLES_LIST_FULFILLED = 'ROLES_LIST_FULFILLED';
export const ROLES_LIST_REJECTED = 'ROLES_LIST_REJECTED';

export const ROLES_ERROR_RESET = 'ROLES_ERROR_RESET';
export const ROLES_RESET = 'ROLES_RESET';

export const list = () => ({
    type: ROLES_LIST,
});

export const errorReset = (...errorKeys) => ({
    type: ROLES_ERROR_RESET,
    payload: { errorKeys },
});
