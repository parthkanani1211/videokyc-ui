import {createSelector} from 'reselect';

export const selectWorkflowList = (state) => state.workflows.data;

export const selectWorkflows = createSelector(
    selectWorkflowList,
    (workflows) => workflows,
);

export const createWorkflowSelector = (selectWorkflowId) => createSelector(
    selectWorkflowId,
    selectWorkflows,
    (workflowId, workflows) => {
        return workflows.find((workflow) => workflow.id === parseInt(workflowId));
    }
);

export const selectWorkflowListTiny = (state) => state.workflows.tinyList;