import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import AgentPageView from "./AgentPageView";
import { withRequestStore } from "../../store/request";

let isRequested = false;
const AgentPageContainer = ({
  requestActions,
  requestListData,
  requestListPending,
  requestSingleData,
  requestHelper,
  history,
  requestPending,
}) => {
  useEffect(() => {
    requestActions.list();
  }, [requestActions]);

  console.log(requestPending);

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

  const handleJoinClick = (rowData) => {
    isRequested = true;
    requestActions.updateSingle(rowData);
  };

  const handleViewClick = (rowData) => {
    history.push(`/audit-report/${rowData.id}`);
  };

  const handleRefreshClick = () => {
    requestActions.list();
  };

  return (
    <AgentPageView
      onRefreshClick={handleRefreshClick}
      onJoinClick={handleJoinClick}
      onViewClick={handleViewClick}
      requestListPending={requestListPending}
      requestListData={requestListData}
      requestHelper={requestHelper}
    />
  );
};

const mapState = (state, { requestSelectors }) => ({
  requestListPending: requestSelectors.getRequestListPending(state),
  requestListData: requestSelectors.getRequestListData(state),
  requestSingleData: requestSelectors.getRequestSingleData(state),
  requestPending: state.request.single,
});

const enhance = compose(withRequestStore, connect(mapState));

export default enhance(AgentPageContainer);
