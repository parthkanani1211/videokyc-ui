export const AI_BLOCKS_LIST = 'AI_BLOCKS_LIST';
export const AI_BLOCKS_LIST_PENDING = 'AI_BLOCKS_LIST_PENDING';
export const AI_BLOCKS_LIST_FULFILLED = 'AI_BLOCKS_LIST_FULFILLED';
export const AI_BLOCKS_LIST_REJECTED = 'AI_BLOCKS_LIST_REJECTED';

export const AI_BLOCKS_LIST_TINY = 'AI_BLOCKS_LIST_TINY';
export const AI_BLOCKS_LIST_TINY_PENDING = 'AI_BLOCKS_LIST_TINY_PENDING';
export const AI_BLOCKS_LIST_TINY_FULFILLED = 'AI_BLOCKS_LIST_TINY_FULFILLED';
export const AI_BLOCKS_LIST_TINY_REJECTED = 'AI_BLOCKS_LIST_TINY_REJECTED';

export const AI_BLOCKS_GET = 'AI_BLOCKS_GET';
export const AI_BLOCKS_GET_PENDING = 'AI_BLOCKS_GET_PENDING';
export const AI_BLOCKS_GET_FULFILLED = 'AI_BLOCKS_GET_FULFILLED';
export const AI_BLOCKS_GET_REJECTED = 'AI_BLOCKS_GET_REJECTED';

export const AI_BLOCKS_CREATE = 'AI_BLOCKS_CREATE';
export const AI_BLOCKS_CREATE_PENDING = 'AI_BLOCKS_CREATE_PENDING';
export const AI_BLOCKS_CREATE_FULFILLED = 'AI_BLOCKS_CREATE_FULFILLED';
export const AI_BLOCKS_CREATE_REJECTED = 'AI_BLOCKS_CREATE_REJECTED';

export const AI_BLOCKS_UPDATE = 'AI_BLOCKS_UPDATE';
export const AI_BLOCKS_UPDATE_PENDING = 'AI_BLOCKS_UPDATE_PENDING';
export const AI_BLOCKS_UPDATE_FULFILLED = 'AI_BLOCKS_UPDATE_FULFILLED';
export const AI_BLOCKS_UPDATE_REJECTED = 'AI_BLOCKS_UPDATE_REJECTED';

export const AI_BLOCKS_DELETE = 'AI_BLOCKS_DELETE';
export const AI_BLOCKS_DELETE_PENDING = 'AI_BLOCKS_DELETE_PENDING';
export const AI_BLOCKS_DELETE_FULFILLED = 'AI_BLOCKS_DELETE_FULFILLED';
export const AI_BLOCKS_DELETE_REJECTED = 'AI_BLOCKS_DELETE_REJECTED';

export const AI_BLOCKS_ERROR_RESET = 'AI_BLOCKS_ERROR_RESET';
export const AI_BLOCKS_RESET = 'AI_BLOCKS_RESET';

export const list = (callback) => ({
    type: AI_BLOCKS_LIST,
    payload: { callback },
});

export const get = (aiBlockId, callback) => ({
    type: AI_BLOCKS_GET,
    payload: { aiBlockId, callback },
});

export const create = (aiBlock, callback) => ({
    type: AI_BLOCKS_CREATE,
    payload: { aiBlock, callback },
});

export const update = (id, aiBlock, callback) => ({
    type: AI_BLOCKS_UPDATE,
    payload: { id, aiBlock, callback },
});

export const deleteAiBlock = (id, callback) => ({
    type: AI_BLOCKS_DELETE,
    payload: { id, callback },
});

export const errorReset = (...errorKeys) => ({
    type: AI_BLOCKS_ERROR_RESET,
    payload: { errorKeys },
});
