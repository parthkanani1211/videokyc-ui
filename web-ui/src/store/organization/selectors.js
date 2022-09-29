import { createSelector } from 'reselect';

export const selectOrganization = (state) => state.organization;

export const getOrganizationData = createSelector(
    [selectOrganization],
    (organization) => organization.data
);

export const getOrganizationPending = createSelector(
    [selectOrganization],
    (organization) => organization.pending
);

export const getOrganizationError = createSelector(
    [selectOrganization],
    (organization) => organization.error
);

export const getOrganizationErrorMessage = createSelector(
    [selectOrganization],
    (organization) => organization.errorMessage
);

export const getOrgAdminExist = createSelector(
    [selectOrganization],
    (organization) => organization.orgAdminExist
);
