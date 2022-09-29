import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import WorkflowEditPageComponent from './WorkflowEditPage.js';
import { create, update, get } from '../../../store/actions/workflows';
import { list } from '../../../store/actions/aiBlocks';
import { selectGroupedAiBlock } from '../../../store/selectors/aiBlocks';
import { createWorkflowSelector } from "../../../store/selectors/workflows";

export const WorkflowEditPage = connect(
    () => {
        const selectWorkflowId = (state, props) => props.match.params.workflowId;

        const selectMode = (state, props) => props.match.params.workflowId === 'new' ? 'create' : 'edit';

        const selectWorkflow = createWorkflowSelector(selectWorkflowId);

        const selectInitialValues = createSelector(
            selectMode,
            selectWorkflow,
            (mode, workflow) => {
                if (mode === 'create') {
                    return {
                        workflowname: '',
                        password: '',
                        confirmPassword: '',
                        role: '',
                        firstname: '',
                        lastname: '',
                        title: '',
                    }
                }

                if (!workflow) {
                    return {};
                }
                return {
                    id: workflow.id,
                    workflowname: workflow.workflowname,
                    role: workflow.roles[0].id,
                    firstname: workflow.firstname,
                    lastname: workflow.lastname,
                    email: workflow.email,
                    title: workflow.title,
                }
            }
        )

        return (state, props) => ({

            // Loaders
            workflowsCreatePending: state.workflows.create.pending,
            workflowsUpdatePending: state.workflows.update.pending,

            // Errors
            workflowsCreateError: state.workflows.create.error,
            workflowsCreateErrorMessage: state.workflows.create.errorMessage,
            workflowsUpdateError: state.workflows.update.error,
            workflowsUpdateErrorMessage: state.workflows.update.errorMessage,

            aiBlocks: selectGroupedAiBlock(state),

            // edit
            workflow: selectWorkflow(state, props),
            initialValues: selectInitialValues(state, props),
            mode: selectMode(state, props),
            workflowId: selectWorkflowId(state, props),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            workflowCreate: create,
            workflowUpdate: update,
            workflowGet: get,
            aiBlocksList: list,
        }, dispatch)
    })
)(WorkflowEditPageComponent);