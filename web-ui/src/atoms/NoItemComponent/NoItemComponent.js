import React from "react";
import { Box, Flex, Text } from "atoms";

export const NoItemComponent = () => {
  return (
    <Flex justifyContent={{ md: "center" }} my="50px">
      <Box>
        <img
          src={require("../../assets/img/no-item.svg")}
          width={200}
          height={200}
          alt="No Items"
        />
        <Text as="h5" fontSize="20px" my="8px" fontWeight="500" textAlign="center">
          No Items
        </Text>
      </Box>
    </Flex>
  );
};
