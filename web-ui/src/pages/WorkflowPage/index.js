import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import WorkflowPageComponent from './WorkflowPage.js';
import { list, deleteWorkflow } from '../../store/actions/workflows';
import { set } from '../../store/actions/pages';
import { selectWorkflows } from '../../store/selectors/workflows';
import { createFilteredSortedDataSelector } from '../../util/selector';
import { createStringDataField } from '../../util/format';

const DEFAULT_SORT = [{ id: 'workflowname', orderBy: 'asc' }];

const selectFields = createSelector(
    () => [
        createStringDataField('workflowname', 'Workflow Name', { sortable: true }),
    ]
);

const selectSort = createSelector(
    (state) => state.pages['workflows-landing'].sort,
    (sort) => sort || DEFAULT_SORT,
);

const selectFilteredFields = createSelector(
    selectFields,
    (fields) => {
        return fields.map(field => field.id);
    }
);

const selectFilteredData = createFilteredSortedDataSelector(
    selectFilteredFields,
    (state) => state.pages['workflows-landing'].filter,
    selectSort,
    selectWorkflows,
);

export const WorkflowPage = connect(
    (state) => ({
        order: state.pages['workflows-landing'].order,
        filter: state.pages['workflows-landing'].filter,
        sort: selectSort(state),
        workflows: selectWorkflows(state),
        workflowsFilteredData: selectFilteredData(state),
        fields: selectFields(state),
        workflowListPending: state.workflows.list.pending,
        workflowDeletePending: state.workflows.delete.pending,
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            workflowsList: list,
            workflowDelete: deleteWorkflow,
            setFilter: (value) => set('workflows-landing', 'filter', value),
            setOrder: (value) => set('workflows-landing', 'order', value),
            setSort: (value) => set('workflows-landing', 'sort', value),
        }, dispatch)
    })
)(WorkflowPageComponent);