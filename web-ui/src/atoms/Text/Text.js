import React, { forwardRef } from "react";
import { Box } from "atoms";

export const Text = forwardRef(({ children, ...props }, textRef) => {
  return (
    <Box {...props} ref={textRef}>
      {children || null}
    </Box>
  );
});
