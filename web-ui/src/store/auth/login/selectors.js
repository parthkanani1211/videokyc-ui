import { createSelector } from 'reselect';

export const selectAuthLogin = (state) => state.auth.login;

export const getAuthLoginData = createSelector(
    [selectAuthLogin],
    (login) => login.data
);

export const getAuthLoginPending = createSelector(
    [selectAuthLogin],
    (login) => login.pending
);

export const getAuthLoginError = createSelector(
    [selectAuthLogin],
    (login) => login.error
);

export const getAuthLoginErrorMessage = createSelector(
    [selectAuthLogin],
    (login) => login.errorMessage
);
