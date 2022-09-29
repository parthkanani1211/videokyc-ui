import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LogoutPageComponent from './LogoutPage.js';
import { logout } from '../../store/actions/session';

export const LogoutPage = connect(
    (state) => ({
        hasAuthToken: Boolean(state.session.authToken)
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            sessionLogout: logout,
        }, dispatch)
    })
)(LogoutPageComponent);