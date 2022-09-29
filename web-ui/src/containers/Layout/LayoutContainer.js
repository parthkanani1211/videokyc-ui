import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Layout from "./Layout";
import { withAuthStore } from "../../store/auth";
import { withRequestStore } from "../../store/request";
import { selectHideUserDetails } from "../../store/selectors/session";
// import { withOrganizationStore } from '../../store/organization';
// import { getSubDomain } from '../../util/domain';
import {
    // removeOrganizationId,
    removeAuthToken,
    // getAuthToken,
} from "../../router/RouterHelpers";

const LayoutContainer = (props) => {
    const {
        authActions,
        // organizationAction,
        routerProps,
        // authAuthenticationToken,
    } = props;
    // useEffect(() => {
    //     removeOrganizationId();

    //     const subDomain = getSubDomain();

    //     if (subDomain) {
    //         organizationAction.get(subDomain);
    //     }
    // }, [organizationAction]);

    // useEffect(() => {
    //     const token = getAuthToken();

    //     if (token && !authAuthenticationToken) {
    //         authActions.authenticate({ token: token });
    //     }
    // }, [authActions, authAuthenticationToken]);

    const handleLogoutClick = () => {
        authActions.clearAuthenticate();
        authActions.clearLogin();
        removeAuthToken();

        routerProps.history.push("/logout");
    };

    return <Layout {...props} onLogoutClick={handleLogoutClick} />;
};

const mapState = (state, { authSelectors, requestSelectors }) => ({
    authAuthenticationData: authSelectors.getAuthAuthenticationData(state),
    authAuthenticationType: authSelectors.getAuthAuthenticationType(state),
    authAuthenticationToken: authSelectors.getAuthAuthenticationToken(state),
    authAuthenticationUsername: authSelectors.getAuthAuthenticationUsername(
        state
    ),
    authAuthenticationMobileNumber: authSelectors.getAuthAuthenticationMobileNumber(
        state
    ),
    requestListData: requestSelectors.getRequestListData(state),
    hideUserDetails: selectHideUserDetails(state),
});

const enhance = compose(withAuthStore, withRequestStore, connect(mapState));

export default enhance(LayoutContainer);
