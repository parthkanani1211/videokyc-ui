import { createReducer } from '../../util';
import * as actions from '../actions/workflows';

const addObjectIfNotExist = (state, workflow) => {
    const data = state.data;
    const { id } = workflow;

    const workflowExist = data.find((x) => x.id === id);
    if (!workflowExist) {
        return {
            data: [...state.data, workflow],
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
    list: {
        ...initialStatusState,
    },
    create: {
        ...initialStatusState,
    },
    update: {
        ...initialStatusState,
    },
    get: {
        ...initialStatusState,
    },
    delete: {
        ...initialStatusState,
    },
};

export default createReducer(initialState, {
    [actions.WORKFLOWS_LIST_PENDING]: (state) => ({
        ...state,
        list: {
            pending: true,
        },
    }),
    [actions.WORKFLOWS_LIST_FULFILLED]: (state, workflows) => ({
        ...state,
        list: {
            ...initialStatusState,
        },
        data: workflows,
    }),
    [actions.WORKFLOWS_LIST_REJECTED]: (state, errorMessage) => ({
        ...state,
        list: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.WORKFLOWS_GET_PENDING]: (state) => ({
        ...state,
        get: {
            pending: true,
        },
    }),
    [actions.WORKFLOWS_GET_FULFILLED]: (state, workflow) => ({
        ...state,
        get: {
            ...initialStatusState,
        },
        ...addObjectIfNotExist(state, workflow),
    }),
    [actions.WORKFLOWS_GET_REJECTED]: (state, errorMessage) => ({
        ...state,
        get: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.WORKFLOWS_CREATE_PENDING]: (state) => ({
        ...state,
        create: {
            pending: true,
        },
    }),
    [actions.WORKFLOWS_CREATE_FULFILLED]: (state) => ({
        ...state,
        create: {
            ...initialStatusState,
        },
    }),
    [actions.WORKFLOWS_CREATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        create: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.WORKFLOWS_UPDATE_PENDING]: (state) => ({
        ...state,
        update: {
            pending: true,
        },
    }),
    [actions.WORKFLOWS_UPDATE_FULFILLED]: (state) => ({
        ...state,
        update: {
            ...initialStatusState,
        },
    }),
    [actions.WORKFLOWS_UPDATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        update: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.WORKFLOWS_DELETE_PENDING]: (state) => ({
        ...state,
        delete: {
            pending: true,
        },
    }),
    [actions.WORKFLOWS_DELETE_FULFILLED]: (state) => ({
        ...state,
        delete: {
            ...initialStatusState,
        },
    }),
    [actions.WORKFLOWS_DELETE_REJECTED]: (state, errorMessage) => ({
        ...state,
        delete: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.WORKFLOWS_RESET]: () => ({ ...initialState }),
});
