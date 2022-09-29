import { takeEvery, put, call } from 'redux-saga/effects';
import * as actions from '../actions/aiBlocks';
import * as API from '../api/aiBlocks';
import { sessionErrorHandling } from './session';

function* list(action) {
    try {
        yield put({ type: actions.AI_BLOCKS_LIST_PENDING });
        const { callback } = action.payload;
        const payload = yield call(API.getAiBlocks);
        yield put({ type: actions.AI_BLOCKS_LIST_FULFILLED, payload });

        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.AI_BLOCKS_LIST_REJECTED,
            payload: errorMessage,
        });
        yield call(sessionErrorHandling, error);
    }
}

function* get(action) {
    try {
        yield put({ type: actions.AI_BLOCKS_GET_PENDING });
        const { aiBlockId, callback } = action.payload;
        const payload = yield call(API.getAiBlock, aiBlockId);
        yield put({ type: actions.AI_BLOCKS_GET_FULFILLED, payload });

        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.AI_BLOCKS_GET_REJECTED,
            payload: errorMessage,
        });
        yield call(sessionErrorHandling, error);
    }
}

function* create(action) {
    try {
        yield put({ type: actions.AI_BLOCKS_CREATE_PENDING });
        const { aiBlock, callback } = action.payload;

        const payload = {
            ...aiBlock,
        };
        const newAiBlock = yield call(API.createAiBlock, payload);
        yield put({ type: actions.AI_BLOCKS_CREATE_FULFILLED, newAiBlock });

        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.AI_BLOCKS_CREATE_REJECTED,
            payload: errorMessage,
        });
        yield call(sessionErrorHandling, error);
    }
}

function* update(action) {
    try {
        yield put({ type: actions.AI_BLOCKS_UPDATE_PENDING });
        const { id, aiBlock, callback } = action.payload;

        yield call(API.updateAiBlock, id, aiBlock);
        yield put({ type: actions.AI_BLOCKS_UPDATE_FULFILLED });

        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.AI_BLOCKS_UPDATE_REJECTED,
            payload: errorMessage,
        });
        yield call(sessionErrorHandling, error);
    }
}

function* deleteAiBlock(action) {
    try {
        yield put({ type: actions.AI_BLOCKS_DELETE_PENDING });
        const { id, callback } = action.payload;
        yield call(API.deleteAiBlock, id);
        yield put({
            type: actions.AI_BLOCKS_DELETE_FULFILLED,
            payload: { id },
        });
        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || {
            error: '',
        };
        yield put({
            type: actions.AI_BLOCKS_DELETE_REJECTED,
            payload: errorMessage,
        });
        yield call(sessionErrorHandling, error);
    }
}

export function* reset() {
    yield put({ type: actions.AI_BLOCKS_RESET });
}

export default function* () {
    yield takeEvery(actions.AI_BLOCKS_LIST, list);
    yield takeEvery(actions.AI_BLOCKS_CREATE, create);
    yield takeEvery(actions.AI_BLOCKS_UPDATE, update);
    yield takeEvery(actions.AI_BLOCKS_GET, get);
    yield takeEvery(actions.AI_BLOCKS_DELETE, deleteAiBlock);
}
