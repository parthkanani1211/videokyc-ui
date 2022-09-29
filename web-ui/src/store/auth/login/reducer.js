import { createReducer } from '../../../util';
import {
    LOGIN_PENDING,
    LOGIN_FULFILLED,
    LOGIN_REJECTED,
    CLEAR_LOGIN,
} from './constants';

const initialState = {
    data: null,
    error: false,
    errorMessage: '',
    pending: false,
};

export default createReducer(initialState, {
    [LOGIN_PENDING]: (state) => ({
        ...state,
        pending: true,
    }),
    [LOGIN_FULFILLED]: (state, response) => ({
        ...initialState,
        data: response,
    }),
    [LOGIN_REJECTED]: (state, errorMessage) => ({
        ...initialState,
        error: true,
        errorMessage,
    }),
    [CLEAR_LOGIN]: () => initialState,
});
