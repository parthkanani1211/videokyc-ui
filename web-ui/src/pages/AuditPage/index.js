import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import AuditPageComponent from './AuditPage.js';
import { list } from '../../store/actions/audits';
import { set } from '../../store/actions/pages';
import { selectApprovedAudits, selectPendingAudits, selectRejectedAudits } from '../../store/selectors/audits';
// import { createFilteredSortedDataSelector } from '../../util/selector';
import { createStringDataField, createDateField } from '../../util/format';

const DEFAULT_SORT = [{ id: 'username', orderBy: 'asc' }];

const selectFields = createSelector(() => [
    createStringDataField('customerName', 'Customer Name'),
    createDateField('createdOn', 'Created Date'),
    createDateField('updatedOn', 'Updated Date'),
    createStringDataField('agentName', 'Agent Name'),
    createStringDataField('videoKYCRequestStatus', 'Status'),
]);

const selectSort = createSelector(
    (state) => state.pages['audits-landing'].sort,
    (sort) => sort || DEFAULT_SORT
);

// const selectFilteredFields = createSelector(selectFields, (fields) => {
//     return fields.map((field) => field.id);
// });

// const selectFilteredData = createFilteredSortedDataSelector(
//     selectFilteredFields,
//     (state) => state.pages['audits-landing'].filter,
//     selectSort,
//     selectAudits
// );

export const AuditPage = connect(
    (state) => ({
        order: state.pages['audits-landing'].order,
        filter: state.pages['audits-landing'].filter,
        sort: selectSort(state),
        approvedAudits: selectApprovedAudits(state),
        pendingAudits: selectPendingAudits(state),
        RejectedAudits: selectRejectedAudits(state),
        // auditFilteredData: selectFilteredData(state),
        fields: selectFields(state),
        auditListPending: state.audits.list.pending,
    }),
    (dispatch) => ({
        actions: bindActionCreators(
            {
                auditList: list,
                setFilter: (value) => set('audits-landing', 'filter', value),
                setOrder: (value) => set('audits-landing', 'order', value),
                setSort: (value) => set('audits-landing', 'sort', value),
            },
            dispatch
        ),
    })
)(AuditPageComponent);