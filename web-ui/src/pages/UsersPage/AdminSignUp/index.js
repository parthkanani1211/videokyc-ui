import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import AdminSignUpComponent from './AdminSignUp.js';
import { register } from '../../../store/actions/users';
import { selectRolesBasedOnRole } from '../../../store/selectors/roles';
import { createUserSelector } from "../../../store/selectors/users";

export const AdminSignUp = connect(
    () => {
        const selectUserId = (state, props) => props.match.params.id;
        const selectUser = createUserSelector(selectUserId);

        const selectInitialValues = createSelector(
            selectUser,
            (user) => {
                return {
                    mobileNumber: '',
                    roles: [],
                    firstName: '',
                    lastName: '',
                    emailAddress: '',
                    title: 'Register as Admin',
                }
            }
        )

        return (state, props) => ({

            // Loaders
            usersRegisterPending: state.users.register.pending,

            // Errors
            usersRegisterError: state.users.register.error,
            usersRegisterErrorMessage: state.users.register.errorMessage,
            
            roles: selectRolesBasedOnRole(state),

            // edit
            user: selectUser(state, props),
            initialValues: selectInitialValues(state, props),
            userId: selectUserId(state, props),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            registerAdmin: register,
        }, dispatch)
    })
)(AdminSignUpComponent);
