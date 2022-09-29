import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { withAuthStore } from '../../store/auth';

const ApplyProtectedNew = (Component) => {
    const ProtectedRoute = (props) => {
        const { authAuthenticationData } = props;

        if (!authAuthenticationData) {
            return <Redirect to="/videoKyc" />;
        }

        return <Component {...props} />;
    };

    const mapState = (state, { authSelectors }) => ({
        authAuthenticationData: authSelectors.getAuthAuthenticationData(state),
    });

    const enhance = compose(withAuthStore, connect(mapState));

    return enhance(ProtectedRoute);
};

export default ApplyProtectedNew;
