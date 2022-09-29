import React from "react";
import { Box } from "atoms";

const CBadge = ({ color, ...props }) => {
  return (
    <Box
      bg={color}
      p="0px 3px"
      color="white"
      fontSize="12px"
      borderRadius="3px"
      width="fit-content"
      textTransform="capitalize"
      {...props}
    />
  );
};

export default CBadge;
