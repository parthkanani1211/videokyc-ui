import { createReducer } from '../../util';
import * as actions from '../actions/pages';

import { INITIAL_TABLE } from '../constants/pages';

const initialStatusState = {
    error: false,
    errorMessage: '',
    pending: false,
};

const initialState = {
    'users-landing': {
        ...INITIAL_TABLE,
    },
    'aiBlocks-landing': {
        ...INITIAL_TABLE,
    },
    'workflows-landing': {
        ...INITIAL_TABLE,
    },
    'audits-landing': {
        ...INITIAL_TABLE,
    },
    ...initialStatusState,
};

export default createReducer(initialState, {
    [actions.PAGES_SET]: (state, { page, key, value }) => ({
        ...state,
        [page]: { ...(state[page] || {}), [key]: value },
    }),
});
