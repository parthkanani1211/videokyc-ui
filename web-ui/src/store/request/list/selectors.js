import { createSelector } from 'reselect';

export const selectRequestList = (state) => state.request.list;

export const getRequestListData = createSelector(
    [selectRequestList],
    (requestList) => requestList.data
);

export const getRequestListPending = createSelector(
    [selectRequestList],
    (requestList) => requestList.pending
);

export const getRequestListError = createSelector(
    [selectRequestList],
    (requestList) => requestList.error
);

export const getRequestListErrorMessage = createSelector(
    [selectRequestList],
    (requestList) => requestList.errorMessage
);
