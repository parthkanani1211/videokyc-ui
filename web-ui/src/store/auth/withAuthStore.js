import React from 'react';
import { connect } from 'react-redux';

import { injectActions } from '../../util/store';

import selectors from './selectors';
import actions from './actions';
// import * as constants from './constants';

const withAuthStore = (WrappedComponent) => {
    const mapState = ({ auth }) => ({ auth });

    const mapDispatch = injectActions('authActions', actions);

    const Component = ({ auth, authActions, ...other }) => (
        <WrappedComponent
            authActions={authActions}
            // authConstants={constants}
            authLoginState={auth.login}
            authSelectors={selectors}
            authAuthenticationState={auth.authentication}
            {...other}
        />
    );

    Component.authParams = WrappedComponent.authParams;

    return connect(mapState, mapDispatch)(Component);
};

export default withAuthStore;
