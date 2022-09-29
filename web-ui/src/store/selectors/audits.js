import { createSelector } from 'reselect';

export const selectApprovedAuditList = (state) => state.audits.approvedData;
export const selectPendingAuditList = (state) => state.audits.pendingData;
export const selectRejectedAuditList = (state) => state.audits.rejectedData;

export const selectApprovedAudits = createSelector(
    selectApprovedAuditList,
    (audits) => {
        return audits.map(audit => {
            return {
                id: audit.id,
                customerName: `${audit.customerDto?.firstName} ${audit.customerDto?.lastName}`,
                videoKYCRequestStatus: audit.videoKYCRequestStatus,
                agentName: `${audit.auditorDto?.firstName} ${audit.auditorDto?.lastName}`,
                updatedOn: audit.updatedOn,
                createdOn: audit.createdOn,
            }
        });
    });

export const selectPendingAudits = createSelector(
    selectPendingAuditList,
    (audits) => {
        return audits.map(audit => {
            return {
                id: audit.id,
                customerName: `${audit.customerDto?.firstName} ${audit.customerDto?.lastName}`,
                videoKYCRequestStatus: audit.videoKYCRequestStatus,
                agentName: audit.agentDto ? `${audit.agentDto?.firstName} ${audit.agentDto?.lastName}` : ' - ' ,
                updatedOn: audit.updatedOn,
                createdOn: audit.createdOn,
            }
        });
    });

export const selectRejectedAudits = createSelector(
    selectRejectedAuditList,
    (audits) => {
        return audits.map(audit => {
            return {
                id: audit.id,
                customerName: `${audit.customerDto?.firstName} ${audit.customerDto?.lastName}`,
                videoKYCRequestStatus: audit.videoKYCRequestStatus,
                agentName: `${audit.auditorDto?.firstName} ${audit.auditorDto?.lastName}`,
                updatedOn: audit.updatedOn,
                createdOn: audit.createdOn,
            }
        });
    });
