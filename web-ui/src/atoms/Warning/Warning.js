import React from "react";
import { Text } from "atoms/Text";

export const Warning = ({ text }) => {
  return (
    <Text
      as="h3"
      variant="small"
      color="steelgrey.500"
      position="absolute"
      bottom={{ xs: -18 }}
      left="12px"
    >
      {text}
    </Text>
  );
};
