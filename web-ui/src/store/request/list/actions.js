import { GET_REQUEST_LIST, CLEAR_REQUEST_LIST } from './constants';

export const list = (formData) => ({
    type: GET_REQUEST_LIST,
    formData,
});

export const clearList = () => ({
    type: CLEAR_REQUEST_LIST,
});
