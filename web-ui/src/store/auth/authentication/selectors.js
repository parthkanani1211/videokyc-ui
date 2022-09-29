import some from 'lodash/some';
import { createSelector } from 'reselect';

import { LOGIN_TYPE } from '../../constants/videoKyc';

export const selectAuthAuthentication = (state) => state.auth.authentication;

export const getAuthAuthenticationData = createSelector(
    [selectAuthAuthentication],
    (authentication) => authentication.data
);

export const getAuthAuthenticationPending = createSelector(
    [selectAuthAuthentication],
    (authentication) => authentication.pending
);

export const getAuthAuthenticationError = createSelector(
    [selectAuthAuthentication],
    (authentication) => authentication.error
);

export const getAuthAuthenticationErrorMessage = createSelector(
    [selectAuthAuthentication],
    (authentication) => authentication.errorMessage
);

export const getAuthAuthenticationToken = createSelector(
    [getAuthAuthenticationData],
    (data) => data?.token
);

export const getAuthAuthenticationProfile = createSelector(
    [getAuthAuthenticationData],
    (authenticationData) => authenticationData?.userDto
);

export const getAuthAuthenticationType = createSelector(
    [getAuthAuthenticationProfile],
    (profile) => {
        if (!profile) {
            return null;
        }

        const { roles } = profile;
        
        if(some(roles, ({ name }) => name === LOGIN_TYPE.ADMIN)) {
            return LOGIN_TYPE.ADMIN;
        } else if(some(roles, ({ name }) => name === LOGIN_TYPE.AUDITOR)) {
            return LOGIN_TYPE.AUDITOR;
        } else if (some(roles, ({ name }) => name === LOGIN_TYPE.AGENT)) {
            return LOGIN_TYPE.AGENT;
        } else if (some(roles, ({ name }) => name === LOGIN_TYPE.CHECKER)) {
            return LOGIN_TYPE.CHECKER;
        } 

        return LOGIN_TYPE.CUSTOMER;
    }
);
/** 
 * Use this to check user with multiple roles to give access to multiple routes
 * */
export const getAuthRoleMap = createSelector(
    [getAuthAuthenticationProfile],
    (profile) => {
        if(!profile) return null;
        
        const { roles } = profile;

        const map = new Map(roles.map(i => [i.name, i.name]));
        
        return map ? map: new Map();
    }
);

export const getAuthAuthenticationUsername = createSelector(
    [getAuthAuthenticationProfile],
    (profile) => {
        if (!profile) {
            return null;
        }

        const { firstName, lastName } = profile;

        return `${firstName}${lastName ? ' ' + lastName : ''}`;
    }
);

export const getAuthAuthenticationMobileNumber = createSelector(
    [getAuthAuthenticationProfile],
    (profile) => profile?.mobileNumber
);

export const getAuthAuthenticationId = createSelector(
    [getAuthAuthenticationProfile],
    (profile) => profile?.id
);
