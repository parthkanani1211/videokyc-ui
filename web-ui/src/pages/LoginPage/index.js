import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginPageComponent from './LoginPage.js';
import { login } from '../../store/actions/session';
import {
    selectLoginPending,
    selectLoginError,
    selectLoginErrorMessage,
} from '../../store/selectors/session';

export const LoginPage = connect(
    (state) => ({
        loginPending: selectLoginPending(state),
        loginError: selectLoginError(state),
        loginErrorMessage: selectLoginErrorMessage(state),
    }),
    (dispatch) => ({
        actions: bindActionCreators(
            {
                sessionLogin: login,
            },
            dispatch
        ),
    })
)(LoginPageComponent);
