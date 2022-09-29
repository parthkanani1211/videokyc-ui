import { createReducer } from '../../../util';
import {
    CREATE_REQUEST_PENDING,
    CREATE_REQUEST_FULFILLED,
    CREATE_REQUEST_REJECTED,
    UPDATE_REQUEST_PENDING,
    UPDATE_REQUEST_FULFILLED,
    UPDATE_REQUEST_REJECTED,
    UPDATE_REQUEST_MANUALLY,
    CLEAR_REQUEST,
} from './constants';

const initialState = {
    data: null,
    error: false,
    errorMessage: '',
    pending: false,
};

export default createReducer(initialState, {
    [CREATE_REQUEST_PENDING]: (state) => ({
        ...state,
        pending: true,
    }),
    [CREATE_REQUEST_FULFILLED]: (state, response) => ({
        ...initialState,
        data: response,
    }),
    [CREATE_REQUEST_REJECTED]: (state, errorMessage) => ({
        ...initialState,
        error: true,
        errorMessage: errorMessage,
    }),
    [UPDATE_REQUEST_PENDING]: (state, response, { updateToStore }) => {
        if (!updateToStore) {
            return state;
        }

        return {
            ...state,
            pending: true,
        };
    },
    [UPDATE_REQUEST_FULFILLED]: (state, response, { updateToStore }) => {
        if (!updateToStore) {
            return state;
        }

        return {
            ...initialState,
            data: response,
        };
    },
    [UPDATE_REQUEST_REJECTED]: (state, errorMessage, { updateToStore }) => {
        if (!updateToStore) {
            return state;
        }

        return {
            ...initialState,
            error: true,
            errorMessage: errorMessage,
        };
    },
    [UPDATE_REQUEST_MANUALLY]: (state, response) => ({
        ...initialState,
        data: response,
    }),
    [CLEAR_REQUEST]: () => initialState,
});
