import {GET_ORGANIZATION, CLEAR_ORGANIZATION, IS_ORGANIZATION_ADMIN_EXIST} from './constants';

export const get = (subDomain) => ({
    type: GET_ORGANIZATION,
    subDomain,
});

export const clearList = () => ({
    type: CLEAR_ORGANIZATION,
});

export const isOrgAdminExist = () => ({
    type: IS_ORGANIZATION_ADMIN_EXIST,
});
