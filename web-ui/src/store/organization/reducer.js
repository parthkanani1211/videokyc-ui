import { createReducer } from '../../util';
import {
    GET_ORGANIZATION_PENDING,
    GET_ORGANIZATION_FULFILLED,
    GET_ORGANIZATION_REJECTED,
    CLEAR_ORGANIZATION,
    IS_ORGANIZATION_ADMIN_EXIST_PENDING,
    IS_ORGANIZATION_ADMIN_EXIST_FULFILLED, IS_ORGANIZATION_ADMIN_EXIST_REJECTED,
} from './constants';

const initialState = {
    data: null,
    error: false,
    errorMessage: '',
    pending: false,
    orgAdminExist: true,
};

export default createReducer(initialState, {
    [GET_ORGANIZATION_PENDING]: (state) => ({
        ...state,
        pending: true,
    }),
    [GET_ORGANIZATION_FULFILLED]: (state, response) => ({
        ...initialState,
        data: response,
    }),
    [GET_ORGANIZATION_REJECTED]: (state, errorMessage) => ({
        ...initialState,
        error: true,
        errorMessage: errorMessage,
    }),
    [IS_ORGANIZATION_ADMIN_EXIST_PENDING]: (state) => ({
        ...state,
        pending: true,
    }),
    [IS_ORGANIZATION_ADMIN_EXIST_FULFILLED]: (state, response) => ({
        ...initialState,
        orgAdminExist: response,
    }),
    [IS_ORGANIZATION_ADMIN_EXIST_REJECTED]: (state, errorMessage) => ({
        ...initialState,
        error: true,
        errorMessage: errorMessage,
    }),
    [CLEAR_ORGANIZATION]: () => initialState,
});
