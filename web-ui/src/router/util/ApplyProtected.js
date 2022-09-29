import React from 'react';
// import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

const applyProtected = (
    Component,
    selectHasAccess = () => true,
    preAuthentication
) => {
    const ProtectedRoute = (props) => {
        return <Component {...props} />;
    };
    return connect((state, props) => ({
        hasAccess: selectHasAccess(state, props),
    }))(ProtectedRoute);
};

export { applyProtected };

export const applyPreAuthentication = (Component) =>
    applyProtected(Component, undefined, true);
