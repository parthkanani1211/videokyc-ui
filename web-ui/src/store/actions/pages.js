export const PAGES_SET = 'PAGES_SET';

export const set = (page, key, value) => ({
    type: PAGES_SET,
    payload: { page, key, value },
});
