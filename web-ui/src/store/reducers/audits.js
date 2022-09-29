import { createReducer } from '../../util';
import * as actions from '../actions/audits';

const initialStatusState = {
    error: false,
    errorMessage: '',
    pending: false,
};

const initialState = {
    approvedData: [],
    pendingData: [],
    rejectedData: [],
    list: {
        ...initialStatusState,
    },
    AuditDetailPending: null,
    AuditDetailData: null,
    AuditDetailerror: null,
};

export default createReducer(initialState, {
    [actions.AUDIT_LIST_PENDING]: (state) => ({
        ...state,
        list: {
            pending: true,
        },
    }),
    [actions.AUDIT_LIST_FULFILLED]: (state, {approved, rejected, pending}) => ({
        ...state,
        list: {
            ...initialStatusState,
        },
        approvedData: approved,
        rejectedData: rejected,
        pendingData: pending,
    }),
    [actions.AUDIT_LIST_REJECTED]: (state, errorMessage) => ({
        ...state,
        list: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.AUDIT_DETAIL_PENDING]: (state, payload, { id }) => ({
        ...state,
        AuditDetailPending: true,
        AuditDetailData: null,
        AuditDetailerror: null,
    }),
    [actions.AUDIT_DETAIL_SUCCESS]: (state, payload, { id }) => ({
        ...state,
        AuditDetailPending: false,
        AuditDetailData: payload,
        AuditDetailerror: false,
    }),
    [actions.AUDIT_DETAIL_FAILED]: (state, payload, { id }) => ({
        ...state,
        AuditDetailPending: false,
        AuditDetailData: null,
        AuditDetailerror: payload,
    }),
});
