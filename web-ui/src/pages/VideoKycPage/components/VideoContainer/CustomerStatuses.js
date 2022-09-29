import React from "react";

import { Box } from "atoms";

import {
  KYC_DOCUMENT_LIST,
  CUSTOMER_DOCUMENT_STATUSES,
  CUSTOMER_DOCUMENT_STATUS_LIST,
} from "store/constants/videoKyc";
import SwitchCamera from "assets/img/switch-camera.png";

const CustomerStatuses = ({ kycStatus, switchCameraHandler }) => {
  return (
    <Box
      display="grid"
      gridAutoFlow={{ md: "column" }}
      gridGap={{ xs: "3px", md: "10px" }}
      maxHeight={42}
      position="absolute"
      bottom={56}
      right={{ xs: "5px", md: 25 }}
    >
      <Box
        p="10px"
        top="-80px"
        left="10px"
        width="45px"
        height="45px"
        border="1px solid"
        position="absolute"
        borderRadius="30px"
        borderColor="gray.500"
        display={{ md: "none" }}
        bg="rgba(196, 196, 196, 0.7)"
        onClick={switchCameraHandler}
      >
        <img src={SwitchCamera} alt="switch camera" width="100%" height="100%" />
      </Box>
      {KYC_DOCUMENT_LIST.map(({ type, label }) => {
        const status = kycStatus[type];

        const bgColor = status
          ? CUSTOMER_DOCUMENT_STATUS_LIST[status].color
          : "rgba(196, 196, 196, 0.7)";

        return (
          <Box
            display="flex"
            alignItems="center"
            background={bgColor}
            color="black"
            borderRadius="4px"
            p="6px"
            height={{ xs: "21px", md: "41px" }}
            width={{ xs: "70px", md: "96px" }}
            justifyContent="center"
            fontSize={{ xs: "10px", md: "14px" }}
          >
            {status === CUSTOMER_DOCUMENT_STATUSES.SUCCESS && <span>&#10003;&nbsp;</span>}
            {label}
          </Box>
        );
      })}
    </Box>
  );
};

export default CustomerStatuses;
