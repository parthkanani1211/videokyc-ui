import { createReducer } from '../../../util';
import {
    GET_REQUEST_LIST_PENDING,
    GET_REQUEST_LIST_FULFILLED,
    GET_REQUEST_LIST_REJECTED,
    CLEAR_REQUEST_LIST,
} from './constants';

const initialState = {
    data: null,
    error: false,
    errorMessage: '',
    pending: false,
};

export default createReducer(initialState, {
    [GET_REQUEST_LIST_PENDING]: (state) => ({
        ...state,
        pending: true,
    }),
    [GET_REQUEST_LIST_FULFILLED]: (state, response) => ({
        ...initialState,
        data: response,
    }),
    [GET_REQUEST_LIST_REJECTED]: (state, errorMessage) => ({
        ...initialState,
        error: true,
        errorMessage: errorMessage,
    }),
    [CLEAR_REQUEST_LIST]: () => initialState,
});
