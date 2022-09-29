import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import AiBlockEditPageComponent from './AiBlockEditPage.js';
import { create, update, get } from '../../../store/actions/users';
import { list } from '../../../store/actions/roles';
import { selectRolesBasedOnRole } from '../../../store/selectors/roles';
import { createUserSelector } from "../../../store/selectors/users";

export const AiBlockEditPage = connect(
    () => {
        const selectUserId = (state, props) => props.match.params.userId;

        const selectMode = (state, props) => props.match.params.userId === 'new' ? 'create' : 'edit';

        const selectUser = createUserSelector(selectUserId);

        const selectInitialValues = createSelector(
            selectMode,
            selectUser,
            (mode, user) => {
                if (mode === 'create') {
                    return {
                        username: '',
                        password: '',
                        confirmPassword: '',
                        role: '',
                        firstname: '',
                        lastname: '',
                        title: '',
                    }
                }

                if (!user) {
                    return {};
                }
                return {
                    id: user.id,
                    username: user.username,
                    role: user.roles[0].id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    title: user.title,
                }
            }
        )

        return (state, props) => ({

            // Loaders
            usersCreatePending: state.users.create.pending,
            usersUpdatePending: state.users.update.pending,

            // Errors
            usersCreateError: state.users.create.error,
            usersCreateErrorMessage: state.users.create.errorMessage,
            usersUpdateError: state.users.update.error,
            usersUpdateErrorMessage: state.users.update.errorMessage,

            roles: selectRolesBasedOnRole(state),

            // edit
            user: selectUser(state, props),
            initialValues: selectInitialValues(state, props),
            mode: selectMode(state, props),
            userId: selectUserId(state, props),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            userCreate: create,
            userUpdate: update,
            userGet: get,
            rolesList: list,
        }, dispatch)
    })
)(AiBlockEditPageComponent);