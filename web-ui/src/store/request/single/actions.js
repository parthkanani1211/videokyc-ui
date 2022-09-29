import {
    CREATE_REQUEST,
    UPDATE_REQUEST,
    UPDATE_REQUEST_MANUALLY,
    CLEAR_REQUEST,
} from './constants';

export const create = (formData) => ({
    type: CREATE_REQUEST,
    formData,
});

export const update = (id, formData) => ({
    type: UPDATE_REQUEST,
    id,
    formData,
});

export const updateSingle = (singleData) => ({
    type: UPDATE_REQUEST_MANUALLY,
    payload: singleData,
});

export const clear = () => ({
    type: CLEAR_REQUEST,
});
