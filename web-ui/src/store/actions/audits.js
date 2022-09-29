export const AUDIT_DETAIL = 'AUDIT_DETAIL';
export const AUDIT_DETAIL_SUCCESS = 'AUDIT_DETAIL_SUCCESS';
export const AUDIT_DETAIL_PENDING = 'AUDIT_DETAIL_PENDING';
export const AUDIT_DETAIL_FAILED = 'AUDIT_DETAIL_FAILED';

export const AUDIT_LIST = 'AUDIT_LIST';
export const AUDIT_LIST_PENDING = 'AUDIT_LIST_PENDING';
export const AUDIT_LIST_FULFILLED = 'AUDIT_LIST_FULFILLED';
export const AUDIT_LIST_REJECTED = 'AUDIT_LIST_REJECTED';

export const getAuditDetail = (data) => ({
    type: AUDIT_DETAIL,
    data,
});

export const list = () => ({
    type: AUDIT_LIST,
});
