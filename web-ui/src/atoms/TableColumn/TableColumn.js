import MemoSearchIcon from "assets/icons/SearchIcon";
import { Box } from "atoms/Box";
import React from "react";

export const TableColumn = ({ onChange, placeholder }) => {
  return (
    <Box className="search-input">
      <Box position="absolute" top="18px" left="10px" zIndex="1">
        <MemoSearchIcon />
      </Box>
      <Box
        width="100%"
        as="input"
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          const value = e.target.value;
          onChange(value);
        }}
      />
    </Box>
  );
};
