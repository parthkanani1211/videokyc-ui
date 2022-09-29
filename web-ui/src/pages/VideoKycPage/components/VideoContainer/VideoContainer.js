import React from "react";

import Box from "@material-ui/core/Box";

import { Box as CBox } from "atoms";
import { LOGIN_TYPE } from "../../../../store/constants/videoKyc";

import CustomerStatuses from "./CustomerStatuses";
import UserVideoComponent from "./UserVideoComponent";
const VideoContainer = ({ kycStatus, loginType, subscriber, publisher, isOtpModalOpen,switchCameraHandler }) => {
  //old
//const VideoContainer = ({ kycStatus, loginType, subscriber, publisher, isOtpModalOpen }) => {
  const bigVideoStreamManager = loginType === LOGIN_TYPE.AGENT ? subscriber : publisher;
  const smallVideoStreamManager = loginType === LOGIN_TYPE.AGENT ? publisher : subscriber;
  
  return (
    <Box
      flex={3}
      display="flex"
      minHeight="180px"
      position="relative"
      flexDirection="column"
      height={{ md: "calc(100% - 85px)" }}
    >
      <Box flex={1} display="flex">
        <UserVideoComponent streamManager={bigVideoStreamManager} isUpper />
      </Box>
      <CBox
        width={{ xs: 100, md: 180 }}
        maxHeight={{ xs: 100, md: 180 }}
        position="absolute"
        bottom={0}
        boxShadow={1}
      >
        <UserVideoComponent streamManager={smallVideoStreamManager} height={{ xs: 100, md: 180 }} />
      </CBox>
      {loginType === LOGIN_TYPE.CUSTOMER && subscriber ? (
        <CustomerStatuses kycStatus={kycStatus} switchCameraHandler={switchCameraHandler}/>
        // <CustomerStatuses kycStatus={kycStatus} isOtpModalOpen={isOtpModalOpen} />
      ) : null}
    </Box>
  );
};

export default VideoContainer;
