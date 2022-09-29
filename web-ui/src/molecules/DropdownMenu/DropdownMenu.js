import React from "react";

import { Flex, Grid, Text } from "atoms";

export const DropdownMenu = ({ menu, hideDropdown }) => {
  return (
    <Grid width="15rem" py="1rem">
      {menu.map((menuItem, index) => (
        <Flex
          as="label"
          px="2rem"
          _hover={{
            backgroundColor: "gray.100",
          }}
          cursor="pointer"
          alignItems="center"
          key={menuItem.text}
        >
          <Text
            width="100%"
            borderBottom={index !== menu.length - 1 ? "1px solid" : undefined}
            borderColor="gray.800"
            py="1rem"
            color="gray.900"
            onClick={() => {
              if (typeof menuItem?.onClick === "function") {
                menuItem.onClick();
              }
              if (menuItem?.closeOnClick !== false) {
                hideDropdown();
              }
            }}
          >
            {menuItem.text}
          </Text>
        </Flex>
      ))}
    </Grid>
  );
};
