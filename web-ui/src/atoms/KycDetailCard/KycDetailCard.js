import React from "react";

import { Grid } from "atoms";

export const KycDetailCard = ({ children }) => {
  return (
    <Grid
      gridRowGap="20px"
      bg="lightgrey.800"
      p={{ xs: "20px", md: "30px" }}
      border="1px solid "
      borderColor="bordergrey.500"
      borderRadius="4px"
    >
      {children}
    </Grid>
  );
};
