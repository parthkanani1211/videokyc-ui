import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { selectUsers } from "store/selectors/users";
import { deleteUser, list } from "store/actions/users";

import AdminUsersPageView from "./AdminUsersPageView";

const AdminUsersPageContainer = ({
  history,
  actions,
  requestHelper,
  requestListData,
  requestListPending,
  requestDeletePending,
}) => {
  const { usersList, userDelete } = actions;

  useEffect(() => {
    usersList();
  }, [usersList]);

  const handleNewClick = () => {
    history.push(`/admin/users/new`);
  };

  const handleUserEdit = (user) => {
    history.push(`/admin/users/edit/${user.id}`);
  };

  const handleUserDelete = (user) => {
    if (user) {
      userDelete(user.id, usersList);
    }
  };

  return (
    <AdminUsersPageView
      onRefreshClick={usersList}
      onUserEdit={handleUserEdit}
      onNewClick={handleNewClick}
      requestHelper={requestHelper}
      onDeleteUser={handleUserDelete}
      requestListData={requestListData}
      requestListPending={requestListPending}
      requestDeletePending={requestDeletePending}
    />
  );
};

const mapState = (state) => ({
  requestListData: selectUsers(state),
  requestListPending: state.users.list.pending,
  requestDeletePending: state.users.delete.pending,
});

const mapDispatch = (dispatch) => ({
  actions: bindActionCreators(
    {
      usersList: list,
      userDelete: deleteUser,
    },
    dispatch
  ),
});

const enhance = connect(mapState, mapDispatch);

export default enhance(AdminUsersPageContainer);
