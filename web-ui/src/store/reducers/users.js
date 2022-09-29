import { createReducer } from '../../util';
import * as actions from '../actions/users';

const addObjectIfNotExist = (state, user) => {
    const data = state.data;
    const { id } = user;

    const userExist = data.find((x) => x.id === id);
    if (!userExist) {
        return {
            data: [...state.data, user],
        };
    }
};

const initialStatusState = {
    error: false,
    errorMessage: '',
    pending: false,
};

const initialState = {
    data: [],
    tinyList: [], // a object <ID: <data>>
    editing: false,
    list: {
        ...initialStatusState,
    },
    create: {
        ...initialStatusState,
    },
    register: {
        ...initialStatusState,
    },
    update: {
        ...initialStatusState,
    },
    get: {
        ...initialStatusState,
    },
    tiny: {
        ...initialStatusState,
    },
    delete: {
        ...initialStatusState,
    },
};

export default createReducer(initialState, {
    [actions.USERS_LIST_PENDING]: (state) => ({
        ...state,
        list: {
            pending: true,
        },
    }),
    [actions.USERS_LIST_FULFILLED]: (state, users) => ({
        ...state,
        list: {
            ...initialStatusState,
        },
        data: users,
    }),
    [actions.USERS_LIST_REJECTED]: (state, errorMessage) => ({
        ...state,
        list: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.REGISTER_ADMIN_PENDING]: (state) => ({
        ...state,
        register: {
            ...initialStatusState,
        },
    }),
    [actions.REGISTER_ADMIN_FULFILLED]: (state, users) => ({
        ...state,
        register: {
            ...initialStatusState,
        },
        data: users,
    }),
    [actions.REGISTER_ADMIN_REJECTED]: (state, errorMessage) => ({
        ...state,
        register: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.USERS_LIST_TINY_PENDING]: (state) => ({
        ...state,
        tinyList: [],
        tiny: {
            pending: true,
        },
    }),
    [actions.USERS_LIST_TINY_FULFILLED]: (state, users) => ({
        ...state,
        tiny: {
            ...initialStatusState,
        },
        tinyList: users,
    }),
    [actions.USERS_LIST_TINY_REJECTED]: (state, errorMessage) => ({
        ...state,
        tiny: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.USERS_GET_PENDING]: (state) => ({
        ...state,
        get: {
            pending: true,
        },
    }),
    [actions.USERS_GET_FULFILLED]: (state, user) => ({
        ...state,
        get: {
            ...initialStatusState,
        },
        ...addObjectIfNotExist(state, user),
    }),
    [actions.USERS_GET_REJECTED]: (state, errorMessage) => ({
        ...state,
        get: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.USERS_CREATE_START]: (state) => ({
        ...state,
        editing: false,
        create: {
            ...initialStatusState,
        },
        update: {
            ...initialStatusState,
        },
    }),
    [actions.USERS_CREATE_PENDING]: (state) => ({
        ...state,
        create: {
            pending: true,
        },
    }),
    [actions.USERS_CREATE_FULFILLED]: (state) => ({
        ...state,
        editing: false,
        create: {
            ...initialStatusState,
        },
    }),
    [actions.USERS_CREATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        editing: false,
        create: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.USERS_UPDATE_START]: (state) => ({
        ...state,
        editing: true,
        create: {
            ...initialStatusState,
        },
        update: {
            ...initialStatusState,
        },
    }),
    [actions.USERS_UPDATE_PENDING]: (state) => ({
        ...state,
        update: {
            pending: true,
        },
    }),
    [actions.USERS_UPDATE_FULFILLED]: (state) => ({
        ...state,
        editing: false,
        update: {
            ...initialStatusState,
        },
    }),
    [actions.USERS_UPDATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        update: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.USERS_DELETE_PENDING]: (state) => ({
        ...state,
        delete: {
            pending: true,
        },
    }),
    [actions.USERS_DELETE_FULFILLED]: (state) => ({
        ...state,
        delete: {
            ...initialStatusState,
        },
    }),
    [actions.USERS_DELETE_REJECTED]: (state, errorMessage) => ({
        ...state,
        delete: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.USERS_RESET]: () => ({ ...initialState }),
});
