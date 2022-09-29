import { AUTHENTICATE, CLEAR_AUTHENTICATE } from './constants';

export const authenticate = ({ formData, token }) => ({
    type: AUTHENTICATE,
    formData,
    token,
});

export const clearAuthenticate = () => ({
    type: CLEAR_AUTHENTICATE,
});
