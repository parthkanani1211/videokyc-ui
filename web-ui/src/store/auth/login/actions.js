import { LOGIN, CLEAR_LOGIN } from './constants';

export const login = (formData) => ({
    type: LOGIN,
    formData,
});

export const clearLogin = () => ({
    type: CLEAR_LOGIN,
});
