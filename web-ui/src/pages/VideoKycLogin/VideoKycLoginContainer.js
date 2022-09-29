import React, { useCallback, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { withAuthStore } from "../../store/auth";
import { withOrganizationStore } from "../../store/organization";
import VideoKycLoginView from "./VideoKycLoginView";
import { getSubDomain } from "../../util/domain";
import { removeOrganizationId, getOrganizationId } from "../../router/RouterHelpers";
import { persist } from "utils/persist";
import { useLocationQueryValue } from "hooks/useLocationQuery";
import { removeCookie } from "utils/cookie";

const VideoKycLoginContainer = (props) => {
  const [otpOpen, setOtpOpen] = React.useState(false);
  const { organizationAction } = props;

  const refId = useLocationQueryValue("refId");
  const mobileNumber = useLocationQueryValue("mobileNumber");

  const {
    authLoginData,
    authLoginError,
    authLoginPending,
    authLoginErrorMessage,
    authAuthenticationData,
    authAuthenticationPending,
    authAuthenticationErrorMessage,
    authActions,
    sessionPending,
  } = props;

  useEffect(() => {
    removeOrganizationId();

    const subDomain = getSubDomain();

    if (subDomain) {
      organizationAction.get(subDomain);
    } else {
      // fallback logic to get organisation for dev.
      organizationAction.get("dev");
    }
  }, [organizationAction]);

  useEffect(() => {
    if (getOrganizationId()) {
      organizationAction.isOrgAdminExist();
    }
  }, [getOrganizationId()]);

  // useEffect(() => {
  //     const { history } = props;

  //     if (authAuthenticationData) {
  //         if (authAuthenticationData?.userDto?.roles[0]?.name === 'Agent') {
  //             history.push('/videoKyc/agent');
  //         } else if (
  //             authAuthenticationData?.userDto?.roles[0]?.name === 'Customer'
  //         ) {
  //             history.push('/videoKyc/customer');
  //         }
  //     }
  // });

  const handleOtpClose = () => {
    setOtpOpen(false);
  };

  const handleLoginSubmit = (formData) => {
    authActions.login(formData);

    setOtpOpen(true);
  };

  useEffect(() => {
    if (mobileNumber && refId) {
      handleLoginSubmit({ mobileNumber, refId });
    }
  }, [mobileNumber, refId]);

  useEffect(() => {
    if (refId) {
      persist("refId", refId);
    } else {
      removeCookie("refId");
    }
  }, [refId]);

  const handleOtpSubmit = (formData) => {
    const authenticateData = {
      mobileNumber: authLoginData?.mobileNumber,
      otp: formData.otp,
      ...(!!refId && { refId }),
    };
    authActions.authenticate({ formData: authenticateData });
  };

  return (
    <VideoKycLoginView
      {...props}
      open={otpOpen}
      setOpen={setOtpOpen}
      loginData={authLoginData}
      loginError={authLoginError}
      loginPending={authLoginPending}
      sessionPending={sessionPending}
      handleOtpClose={handleOtpClose}
      handleOtpSubmit={handleOtpSubmit}
      handleLoginSubmit={handleLoginSubmit}
      loginErrorMessage={authLoginErrorMessage}
      authenticateData={authAuthenticationData}
      authenticatePending={authAuthenticationPending}
      initialValue={mobileNumber ? { mobileNumber } : undefined}
      authenticateErrorMessage={authAuthenticationErrorMessage}
    />
  );
};

const mapState = (state, { authSelectors }) => ({
  authLoginData: authSelectors.getAuthLoginData(state),
  authLoginPending: authSelectors.getAuthLoginPending(state),
  authLoginError: authSelectors.getAuthLoginError(state),
  authLoginErrorMessage: authSelectors.getAuthLoginErrorMessage(state),
  authAuthenticationData: authSelectors.getAuthAuthenticationData(state),
  authAuthenticationPending: authSelectors.getAuthAuthenticationPending(state),
  authAuthenticationError: authSelectors.getAuthAuthenticationError(state),
  authAuthenticationErrorMessage: authSelectors.getAuthAuthenticationErrorMessage(state),
  sessionPending: state.session.construct.pending,
});

const enhance = compose(withAuthStore, withOrganizationStore, connect(mapState));

export default enhance(VideoKycLoginContainer);
