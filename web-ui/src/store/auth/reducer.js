import { combineReducers } from 'redux';

import login from './login/reducer';
import authentication from './authentication/reducer';

export default combineReducers({
    login,
    authentication,
});
