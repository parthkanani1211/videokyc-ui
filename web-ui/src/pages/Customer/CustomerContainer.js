import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { withAuthStore } from "../../store/auth";
import { withRequestStore } from "../../store/request";

import CustomerView from "./CustomerView";
import { hydrate } from "utils/persist";

let isRequested = false;
const CustomerContainer = ({
  authAuthenticationId,
  authAuthenticationType,
  history,
  requestActions,
  requestListData,
  requestListPending,
  requestSingleData,
  requestHelper,
  profile,
  pendingState,
}) => {
  useEffect(() => {
    requestActions.list({
      id: authAuthenticationId,
      role: authAuthenticationType,
    });
  }, [requestActions, authAuthenticationId, authAuthenticationType]);

  // const handleStartNewVideoKycClick = () => {
  //   history.push("/videoKyc/customer/content");
  // };

  useEffect(() => {
    if (requestSingleData && isRequested) {
      history.push(`/videoKyc/start-kyc/${requestSingleData.sessionName}`);
    }
  }, [requestSingleData, history]);

  useEffect(
    () => () => {
      isRequested = false;
    },
    []
  );

  const handleRestartClick = (rowData) => {
    const { id: requestId } = rowData;

    isRequested = true;

    requestActions.update(requestId, {
      userId: authAuthenticationId,
      action: "restart",
      updateToStore: true,
    });
  };

  const handleRefreshClick = () => {
    requestActions.list({
      id: authAuthenticationId,
      role: authAuthenticationType,
    });
  };

  const handleStartNewVideoKycClick = () => {
    const { id, mobileNumber } = profile;

    isRequested = true;

    requestActions.create({
      requestedBy: id,
      mobileNumber,
      refId: hydrate("refId"),
    });
  };

  return (
    <CustomerView
      onRestartClick={handleRestartClick}
      onRefreshClick={handleRefreshClick}
      requestListData={requestListData}
      requestListPending={requestListPending}
      requestHelper={requestHelper}
      pendingState={pendingState}
      onStartNewVideoKycClick={handleStartNewVideoKycClick}
    />
  );
};

const mapState = (state, { authSelectors, requestSelectors }) => ({
  profile: authSelectors.getAuthAuthenticationProfile(state),
  authAuthenticationType: authSelectors.getAuthAuthenticationType(state),
  authAuthenticationId: authSelectors.getAuthAuthenticationId(state),
  requestSingleData: requestSelectors.getRequestSingleData(state),
  requestListData: requestSelectors.getRequestListData(state),
  requestListPending: requestSelectors.getRequestListPending(state),
  pendingState: requestSelectors.getRequestSinglePending(state),
});

const enhance = compose(withAuthStore, withRequestStore, connect(mapState));

export default enhance(CustomerContainer);
