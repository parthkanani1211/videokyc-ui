import React, { useEffect, useMemo, useState } from "react";
import { Loadable } from "../../../common";
import { renderErrorMessage } from "../../../util/error";
import UserForm from "../UserForm/UserForm";

export default function UsersEditPage(props) {
  const {
    usersCreatePending,
    usersUpdatePending,
    clientsGetPending,
    userId,
    actions: { userCreate, userUpdate, userGet },
  } = props;

  const [triggered, setTriggered] = useState(false);

  const handleCallback = () => {
    props.history.push("/admin/users");
  };

  const isEdit = useMemo(() => !!props.initialValues?.mobileNumber, [props.initialValues]);

  useEffect(() => {
    if (isEdit) {
      userGet(userId);
    }
  }, [userId, userGet, isEdit]);

  const renderMessage = () => {
    const {
      usersCreateError,
      usersCreateErrorMessage,
      usersUpdateError,
      usersUpdateErrorMessage,
    } = props;
    return (
      renderErrorMessage(usersCreateError, usersCreateErrorMessage) ||
      renderErrorMessage(usersUpdateError, usersUpdateErrorMessage)
    );
  };

  const handleUserFormSubmit = (payload) => {
    setTriggered(true);
    if (userId) {
      const user = {
        id: payload.id,
        mobileNumber: payload.mobileNumber,
        firstName: payload.firstName,
        lastName: payload.lastName,
        roles: [{ name: payload.roles }],
        emailAddress: payload.emailAddress,
      };
      userUpdate(payload.id, user, handleCallback);
    } else {
      const user = {
        mobileNumber: payload.mobileNumber,
        firstName: payload.firstName,
        lastName: payload.lastName,
        roles: [{ name: payload.roles }],
        emailAddress: payload.emailAddress,
      };
      userCreate(user, handleCallback);
    }
  };

  return (
    <Loadable loading={usersCreatePending || usersUpdatePending || clientsGetPending}>
      <UserForm
        title={isEdit ? "Edit User" : "Add New User"}
        submitLabel={isEdit ? "Save Changes" : "Add"}
        pendingLabel="Saving Changes"
        errorMessage={
          triggered && (isEdit ? props.usersUpdateErrorMessage : props.usersCreateErrorMessage)
        }
        disableRoles={isEdit}
        disableMobileNumber={isEdit}
        cancelClicked={handleCallback}
        userFormSubmit={handleUserFormSubmit}
        {...props}
      />
    </Loadable>
  );
}
