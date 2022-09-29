import { createSelector } from 'reselect';

export const selectRequestSingle = (state) => state.request.single;

export const getRequestSingleData = createSelector(
    [selectRequestSingle],
    (requestSingle) => requestSingle.data
);

export const getRequestSinglePending = createSelector(
    [selectRequestSingle],
    (requestSingle) => requestSingle.pending
);

export const getRequestSingleError = createSelector(
    [selectRequestSingle],
    (requestSingle) => requestSingle.error
);

export const getRequestSingleErrorMessage = createSelector(
    [selectRequestSingle],
    (requestSingle) => requestSingle.errorMessage
);

export const getRequestSingleSessionName = createSelector(
    [getRequestSingleData],
    (data) => data?.sessionName || 'SessionA'
);
