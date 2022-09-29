import React from "react";

import { Text, Box, Flex } from "atoms";

import OpenViduVideoComponent from "./OvVideo";
import { LOGIN_TYPE } from "store/constants/videoKyc";

const UserVideoComponent = ({ streamManager, height, isUpper }) => {
  if (!streamManager) {
    return null;
  }

  const getNicknameTag = () => {
    const connectionData = JSON.parse(streamManager.stream.connection.data);
    return (
      <Box
        fontSize={{
          xs: connectionData.loginType === LOGIN_TYPE.AGENT ? "12px" : "14px",
          md: "14px",
        }}
        display="flex"
        alignItems="center"
      >
        <Box display="inline-block" truncate>
          {connectionData.clientData}
        </Box>{" "}
        <Box
          as="span"
          p="1px 8px"
          bg={isUpper ? "blue.500" : "yellow.500"}
          borderRadius="2px"
          ml={{ xs: "5px", md: "10px" }}
          fontSize={{
            xs: connectionData.loginType === LOGIN_TYPE.AGENT ? "10px" : "12px",
            md: connectionData.loginType === LOGIN_TYPE.AGENT ? "12px" : "14px",
          }}
        >
          {connectionData.loginType}
        </Box>
      </Box>
    );
  };

  return (
    <Box
      bg="black"
      width="100%"
      display="flex"
      position="relative"
      maxHeight={{ xs: "40vh", md: "calc(100vh - 260px)" }}
    >
      <Flex height={height || "100%"} width="100%">
        <OpenViduVideoComponent streamManager={streamManager} />
      </Flex>
      <Box
        position="absolute"
        top={isUpper ? "0px" : "unset"}
        bottom={isUpper ? "unset" : "0px"}
        padding={{ xs: "10px", md: "15px 17px" }}
        color="white"
        width="100%"
        background={
          isUpper
            ? "linear-gradient(180deg, rgba(17, 17, 17, 0.4) 0%, rgba(17, 17, 17, 0) 100%)"
            : "linear-gradient(0deg, rgba(17, 17, 17, 0.4) 0%, rgba(17, 17, 17, 0) 100%)"
        }
      >
        <Text variant="caption">{getNicknameTag()}</Text>
      </Box>
    </Box>
  );
};

export default UserVideoComponent;
