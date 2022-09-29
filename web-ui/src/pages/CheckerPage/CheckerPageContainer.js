import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import CheckerPageView from "./CheckerPageView";
import { withRequestStore } from "../../store/request";

const CheckerPageContainer = ({
  requestActions,
  requestListData,
  requestListPending,
  requestSingleData,
  requestHelper,
  history,
}) => {
  useEffect(() => {
    requestActions.list();
  }, [requestActions]);

  useEffect(() => {
    if (requestSingleData) {
      history.push(`/videoKyc/start-kyc/${requestSingleData.sessionName}`);
    }
  }, [requestSingleData, history]);

  const handleJoinClick = (rowData) => {
    requestActions.updateSingle(rowData);
  };

  const handleViewClick = (rowData) => {
    history.push(`/audit-report/${rowData.id}`);
  };

  const handleRefreshClick = () => {
    requestActions.list();
  };

  return (
    <CheckerPageView
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
});

const enhance = compose(withRequestStore, connect(mapState));

export default enhance(CheckerPageContainer);
