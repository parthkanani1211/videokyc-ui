import { createReducer } from '../../util';
// import storage from "redux-persist/lib/storage";
import * as actions from '../actions/session';
// import * as routerHelpers from "../../router/RouterHelpers";
// import { toLocalStorage } from "../../util/storage";

const API_INITIAL_STATE = {
    pending: false,
    done: false,
    error: false,
};

const SESSION_UNAUTHORIZE = {
    authenticated: false,
    preAuthentication: false,
    hideUserDetails: false,
    user: null,
};

const initialState = {
    user: null,
    isManualLogout: false,
    authenticated: false,
    preAuthentication: false,
    login: {
        ...API_INITIAL_STATE,
    },
    construct: {
        ...API_INITIAL_STATE,
    },
    autoLogin: {
        ...API_INITIAL_STATE,
    }
};

export default createReducer(initialState, {
    [actions.SESSION_LOGIN_PENDING]: (state) => ({
        ...state,
        login: {
            ...API_INITIAL_STATE,
            pending: true,
        },
        ...SESSION_UNAUTHORIZE,
    }),

    [actions.SESSION_LOGIN_FULFILLED]: (state) => ({
        ...state,
        login: {
            ...API_INITIAL_STATE,
            done: true,
        },
        ...SESSION_UNAUTHORIZE,
        preAuthentication: true,
    }),

    [actions.SESSION_LOGIN_REJECTED]: (state, errorMessage) => ({
        ...state,
        login: {
            ...API_INITIAL_STATE,
            error: true,
            errorMessage,
        },
        ...SESSION_UNAUTHORIZE,
    }),
    [actions.SESSION_AUTO_LOGIN_PENDING]: (state) => ({
        ...state,
        autoLogin: {
            ...API_INITIAL_STATE,
            pending: true,
        },
        ...SESSION_UNAUTHORIZE,
    }),

    [actions.SESSION_AUTO_LOGIN_FULFILLED]: (state) => ({
        ...state,
        autoLogin: {
            ...API_INITIAL_STATE,
            done: true,
        },
        ...SESSION_UNAUTHORIZE,
        preAuthentication: true,
        hideUserDetails: true,
    }),

    [actions.SESSION_AUTO_LOGIN_REJECTED]: (state, errorMessage) => ({
        ...state,
        autoLogin: {
            ...API_INITIAL_STATE,
            error: true,
            errorMessage,
        },
        ...SESSION_UNAUTHORIZE,
    }),
    [actions.SESSION_CONSTRUCT_PENDING]: (state) => ({
        ...state,
        construct: {
            ...API_INITIAL_STATE,
            pending: true,
        },
    }),

    [actions.SESSION_CONSTRUCT_FULFILLED]: (state) => ({
        ...state,
        construct: {
            ...API_INITIAL_STATE,
            done: true,
        },
        authenticated: true,
        preAuthentication: false,
    }),

    [actions.SESSION_CONSTRUCT_REJECTED]: (state) => ({
        ...state,
        construct: {
            ...API_INITIAL_STATE,
            error: true,
        },
        user: null,
        authenticated: false,
        preAuthentication: false,
    }),

    [actions.SESSION_USER_OBJECT]: (state, { user }) => ({
        ...state,
        user,
    }),
    [actions.SESSION_USER_PROFILE]: (state, { profile }) => ({
        ...state,
        profile,
    }),

    [actions.SESSION_LOGOUT]: (state, { isManual }) => ({
        ...state,
        ...SESSION_UNAUTHORIZE,
        isManualLogout: isManual,
    }),
});
