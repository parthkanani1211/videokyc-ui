import { combineReducers } from 'redux';

import aiBlocks from './reducers/aiBlocks';
import audits from './reducers/audits';
import auth from './auth/reducer';
import organization from './organization/reducer';
import pages from './reducers/pages';
import request from './request/reducer';
import roles from './reducers/roles';
import session from './reducers/session';
import users from './reducers/users';
import videoKyc from './reducers/videoKyc';
import workflows from './reducers/workflows';

export const rootReducer = combineReducers({
    aiBlocks,
    audits,
    auth,
    organization,
    pages,
    request,
    roles,
    session,
    users,
    videoKyc,
    workflows,
});

export default rootReducer;
