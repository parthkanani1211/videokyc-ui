import { Box, Text } from "atoms";
import React from "react";

export default function DefaultFooter(props) {
  return (
    <React.Fragment>
      {/* <span>
        <a href="/">Obvious</a> &copy; 2020.
      </span> */}
      <Box
        width="100%"
        height="40px"
        bg="rgba(2, 19, 85, 1);
"
      >
        <Text
          as="h6"
          pt="14px"
          color="white"
          fontSize="12px"
          pl={{ md: "30px" }}
          textAlign={{ xs: "center", md: "left" }}
        >
          Copyright 2021 Obvious. All Rights Reserved.
        </Text>
      </Box>
    </React.Fragment>
  );
}
