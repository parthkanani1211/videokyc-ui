export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGIN_PENDING = 'SESSION_LOGIN_PENDING';
export const SESSION_LOGIN_FULFILLED = 'SESSION_LOGIN_FULFILLED';
export const SESSION_LOGIN_REJECTED = 'SESSION_LOGIN_REJECTED';

export const SESSION_CONSTRUCT = 'SESSION_CONSTRUCT';
export const SESSION_CONSTRUCT_PENDING = 'SESSION_CONSTRUCT_PENDING';
export const SESSION_CONSTRUCT_FULFILLED = 'SESSION_CONSTRUCT_FULFILLED';
export const SESSION_CONSTRUCT_REJECTED = 'SESSION_CONSTRUCT_REJECTED';

export const SESSION_AUTO_LOGIN = 'SESSION_AUTO_LOGIN';
export const SESSION_AUTO_LOGIN_PENDING = 'SESSION_AUTO_LOGIN_PENDING';
export const SESSION_AUTO_LOGIN_FULFILLED = 'SESSION_AUTO_LOGIN_FULFILLED';
export const SESSION_AUTO_LOGIN_REJECTED = 'SESSION_AUTO_LOGIN_REJECTED';

export const SESSION_DECONSTRUCT = 'SESSION_DECONSTRUCT';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';

export const SESSION_USER_OBJECT = 'SESSION_USER_OBJECT';
export const SESSION_USER_PROFILE = 'SESSION_USER_PROFILE';

export const construct = (user) => ({
    type: SESSION_CONSTRUCT,
    payload: { user },
});

export const deconstruct = () => ({
    type: SESSION_DECONSTRUCT,
    payload: {},
});

export const login = (username = '', password = '') => ({
    type: SESSION_LOGIN,
    payload: { username, password },
});

export const logout = (manual = false) => ({
    type: SESSION_LOGOUT,
    payload: { manual },
});

export const autoLogin = (username = '', callback) => ({
    type: SESSION_AUTO_LOGIN,
    payload: { username, callback},
});
