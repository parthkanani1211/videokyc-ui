import { createSelector } from 'reselect';
import { ROLE_SUPERADMIN, ROLE_PARTNER } from '../constants/roles';

export const selectAuthenticated = (state) => state.session.authenticated;

export const selectPreAuthentication = (state) =>
    state.session.preAuthentication;

export const selectSessionRole = (state) =>
    (state.session.user && state.session.user.role) || '';

export const selectSessionUserId = (state) => state.session.user.id;

export const selectSessionUser = (state) => state.session.user;
export const selectHideUserDetails = (state) => state.session.hideUserDetails;

export const selectSessionUserClientId = (state) => state.session.user.clientId;

export const createHasSessionAccessSelector = (allowedRoleNames) => {
    const checkRoles = allowedRoleNames && allowedRoleNames.length;

    if (checkRoles) {
        return createSelector(selectSessionRole, (role) =>
            allowedRoleNames.some((roleName) => roleName === role)
        );
    }
    return () => true;
};

export const createHasSessionAuthenticationSelector = () => {
    return createSelector(
        selectAuthenticated,
        (isAuthenticated) => isAuthenticated
    );
};

export const selectIsSuperAdmin = createSelector(
    selectSessionRole,
    (sessionRole) => {
        if (sessionRole === ROLE_SUPERADMIN) {
            return true;
        } else {
            return false;
        }
    }
);

export const selectIsPartner = createSelector(
    selectSessionRole,
    (sessionRole) => {
        if (sessionRole === ROLE_PARTNER) {
            return true;
        } else {
            return false;
        }
    }
);

export const selectIsSuperadminOrPartner = createSelector(
    selectSessionRole,
    (sessionRole) => {
        if (sessionRole === ROLE_SUPERADMIN || sessionRole === ROLE_PARTNER) {
            return true;
        } else {
            return false;
        }
    }
);

export const selectLoginErrorMessage = createSelector(
    (state) => state.session,
    (session) =>
        session.login['errorMessage'] || session.construct['errorMessage']
);

export const selectLoginError = createSelector(
    (state) => state.session,
    (session) => session.login['error']
);

export const selectLoginPending = createSelector(
    (state) => state.session,
    (session) => session.login['pending'] || session.construct['pending']
);

export const selectAutoLoginErrorMessage = createSelector(
    (state) => state.session,
    (session) =>
        session.autoLogin['errorMessage'] || session.construct['errorMessage']
);

export const selectAutoLoginError = createSelector(
    (state) => state.session,
    (session) => session.autoLogin['error']
);

export const selectAutoLoginPending = createSelector(
    (state) => state.session,
    (session) => session.autoLogin['pending'] || session.construct['pending']
);

export const selectChangePasswordErrorMessage = createSelector(
    (state) => state.session,
    (session) => session.changePassword['errorMessage']
);

export const selectChangePasswordError = createSelector(
    (state) => state.session,
    (session) => session.changePassword['error']
);

export const selectChangePasswordPending = createSelector(
    (state) => state.session,
    (session) => session.changePassword['pending']
);

export const selectChangePasswordDone = createSelector(
    (state) => state.session,
    (session) => session.changePassword['done']
);
