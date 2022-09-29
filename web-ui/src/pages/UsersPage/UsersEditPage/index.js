import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createSelector } from "reselect";

import UsersEditPageComponent from "./UsersEditPage.js";
import { create, update, get } from "../../../store/actions/users";
import { selectRolesBasedOnRole } from "../../../store/selectors/roles";
import { createUserSelector } from "../../../store/selectors/users";

export const UsersEditPage = connect(
  () => {
    const selectUserId = (state, props) => props.match.params.id;
    const selectUser = createUserSelector(selectUserId);

    const selectInitialValues = createSelector(selectUser, (user) => {
      if (user) {
        return {
          id: user.id,
          mobileNumber: user.mobileNumber,
          roles: user.roles?.filter((role) => role.id !== 8)?.[0]?.name,
          firstName: user.firstName,
          lastName: user.lastName,
          emailAddress: user.emailAddress,
          title: user.title,
        };
      } else {
        return {
          mobileNumber: "",
          roles: "",
          firstName: "",
          lastName: "",
          emailAddress: "",
          title: "",
        };
      }
    });

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

      user: selectUser(state, props),
      initialValues: selectInitialValues(state, props),
      userId: selectUserId(state, props),
    });
  },
  (dispatch) => ({
    actions: bindActionCreators(
      {
        userCreate: create,
        userUpdate: update,
        userGet: get,
      },
      dispatch
    ),
  })
)(UsersEditPageComponent);
