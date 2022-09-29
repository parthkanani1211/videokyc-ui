import { createReducer } from '../../util';
import * as actions from '../actions/aiBlocks';

const addObjectIfNotExist = (state, aiBlock) => {
    const data = state.data;
    const { id } = aiBlock;

    const aiBlockExist = data.find((x) => x.id === id);
    if (!aiBlockExist) {
        return {
            data: [...state.data, aiBlock],
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
    [actions.AI_BLOCKS_LIST_PENDING]: (state) => ({
        ...state,
        list: {
            pending: true,
        },
    }),
    [actions.AI_BLOCKS_LIST_FULFILLED]: (state, aiBlocks) => ({
        ...state,
        list: {
            ...initialStatusState,
        },
        data: aiBlocks,
    }),
    [actions.AI_BLOCKS_LIST_REJECTED]: (state, errorMessage) => ({
        ...state,
        list: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.AI_BLOCKS_GET_PENDING]: (state) => ({
        ...state,
        get: {
            pending: true,
        },
    }),
    [actions.AI_BLOCKS_GET_FULFILLED]: (state, aiBlock) => ({
        ...state,
        get: {
            ...initialStatusState,
        },
        ...addObjectIfNotExist(state, aiBlock),
    }),
    [actions.AI_BLOCKS_GET_REJECTED]: (state, errorMessage) => ({
        ...state,
        get: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.AI_BLOCKS_CREATE_PENDING]: (state) => ({
        ...state,
        create: {
            pending: true,
        },
    }),
    [actions.AI_BLOCKS_CREATE_FULFILLED]: (state) => ({
        ...state,
        create: {
            ...initialStatusState,
        },
    }),
    [actions.AI_BLOCKS_CREATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        create: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.AI_BLOCKS_UPDATE_PENDING]: (state) => ({
        ...state,
        update: {
            pending: true,
        },
    }),
    [actions.AI_BLOCKS_UPDATE_FULFILLED]: (state) => ({
        ...state,
        update: {
            ...initialStatusState,
        },
    }),
    [actions.AI_BLOCKS_UPDATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        update: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.AI_BLOCKS_DELETE_PENDING]: (state) => ({
        ...state,
        delete: {
            pending: true,
        },
    }),
    [actions.AI_BLOCKS_DELETE_FULFILLED]: (state) => ({
        ...state,
        delete: {
            ...initialStatusState,
        },
    }),
    [actions.AI_BLOCKS_DELETE_REJECTED]: (state, errorMessage) => ({
        ...state,
        delete: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.AI_BLOCKS_RESET]: () => ({ ...initialState }),
});
