import { createReducer } from '../../util';
import * as actions from '../actions/roles';

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
};

export default createReducer(initialState, {
    [actions.ROLES_LIST_PENDING]: (state) => ({
        ...state,
        list: {
            pending: true,
        },
    }),
    [actions.ROLES_LIST_FULFILLED]: (state, roles) => ({
        ...state,
        list: {
            ...initialStatusState,
        },
        data: roles,
    }),
    [actions.ROLES_LIST_REJECTED]: (state, errorMessage) => ({
        ...state,
        list: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),

    [actions.ROLES_RESET]: () => ({ ...initialState }),
});
