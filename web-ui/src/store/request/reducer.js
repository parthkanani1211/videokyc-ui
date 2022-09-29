import { combineReducers } from 'redux';

import single from './single/reducer';
import list from './list/reducer';

export default combineReducers({
    single,
    list,
});
