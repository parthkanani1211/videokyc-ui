import _ from 'lodash';
import { bindActionCreators } from 'redux';

export const injectActions = (name, actions) => (dispatch) => ({
    [name]: _.mapValues(actions, (action) =>
        bindActionCreators(action, dispatch)
    ),
});
