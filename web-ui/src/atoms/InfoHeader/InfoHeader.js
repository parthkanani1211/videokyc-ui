import React from "react";
import { Box, Text } from "atoms";

export const InfoHeader = ({ heading, detail }) => {
  return (
    <Box>
      <Text
        fontSize="14px"
        fontFamily='"Poppins", "sans-serif"'
        color="rgba(17, 17, 17, 0.6)"
        fontWeight="500"
      >
        {heading}
        <Box as="span" display={{ xs: "none", md: "initial" }}>
          :
        </Box>
      </Text>
      {detail !== undefined ? (
        <Text fontSize="16px" fontFamily='"Poppins", "sans-serif"' color="black" mt="5px">
          {detail}
        </Text>
      ) : (
        "-"
      )}
    </Box>
  );
};
