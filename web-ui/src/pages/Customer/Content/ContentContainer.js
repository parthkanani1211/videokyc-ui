import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { withAuthStore } from "../../../store/auth";
import { withRequestStore } from "../../../store/request";

import ContentView from "./ContentView";

const ContentContainer = ({
  profile,
  requestActions,
  history,
  requestSingleData,
  pendingState,
}) => {
  useEffect(() => {
    if (requestSingleData) {
      history.push(`/videoKyc/start-kyc/${requestSingleData.sessionName}`);
    }
  }, [requestSingleData, history]);

  const handleStartNewVideoKycClick = () => {
    const { id, mobileNumber } = profile;

    requestActions.create({
      requestedBy: id,
      mobileNumber,
    });
  };

  const handleBackClick = () => {
    history.push("/videoKyc/customer");
  };

  return (
    <ContentView
      onBackClick={handleBackClick}
      onStartNewVideoKycClick={handleStartNewVideoKycClick}
      pendingState={pendingState}
    />
  );
};

const mapState = (state, { authSelectors, requestSelectors }) => ({
  profile: authSelectors.getAuthAuthenticationProfile(state),
  requestSingleData: requestSelectors.getRequestSingleData(state),
  pendingState: requestSelectors.getRequestSinglePending(state),
});

const enhance = compose(withAuthStore, withRequestStore, connect(mapState));

export default enhance(ContentContainer);
