import { createSelector } from 'reselect';
import { ROLE_SUPERADMIN, ROLE_PARTNER } from '../constants/roles';
import { selectSessionRole } from './session';

export const selectRoleList = (state) => state.roles.data;

export const selectRoles = createSelector(selectRoleList, (roles) => roles);

//while creating the users, superadmin can only create another super admin
export const selectRolesBasedOnRole = createSelector(
    selectRoleList,
    selectSessionRole,
    (roles, sessionRole) => {
        if (sessionRole !== ROLE_SUPERADMIN) {
            if (sessionRole === ROLE_PARTNER) {
                return roles.filter(
                    (role) =>
                        role.name !== ROLE_SUPERADMIN &&
                        role.name !== ROLE_PARTNER
                );
            }
            return roles.filter((role) => role.name !== ROLE_SUPERADMIN);
        }
        return roles;
    }
);
