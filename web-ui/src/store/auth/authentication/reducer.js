import { createReducer } from '../../../util';
import {
    AUTHENTICATE_PENDING,
    AUTHENTICATE_FULFILLED,
    AUTHENTICATE_REJECTED,
    CLEAR_AUTHENTICATE,
} from './constants';

const initialState = {
    data: null,
    error: false,
    errorMessage: '',
    pending: false,
};

export default createReducer(initialState, {
    [AUTHENTICATE_PENDING]: (state) => ({
        ...state,
        pending: true,
    }),
    [AUTHENTICATE_FULFILLED]: (state, response) => ({
        ...initialState,
        data: response,
    }),
    [AUTHENTICATE_REJECTED]: (state, errorMessage) => ({
        ...initialState,
        error: true,
        errorMessage,
    }),
    [CLEAR_AUTHENTICATE]: () => initialState,
});
