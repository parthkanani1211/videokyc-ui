import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { withStyles } from "@material-ui/core/styles";
import { red, green } from "@material-ui/core/colors";
import TableContainer from "@material-ui/core/TableContainer";

import { InputField, Text } from "atoms";

const styles = {
  errorText: {
    color: red[600],
  },
  greenCell: {
    color: green[700],
  },
  redCell: {
    color: red[700],
  },
};

const VideoKycResponse = ({
  data,
  error,
  isEdit,
  classes,
  responseData,
  errorMessage,
  updatedverificationData,
}) => {
  const [matchResults, setMatchResults] = useState([]);

  useEffect(() => {
    if (data) {
      const { kycVerificationData } = data;
      if (responseData) {
        const { matchResults } = responseData;
        setMatchResults(matchResults);
      } else {
        const { matchResults } = kycVerificationData;
        setMatchResults(matchResults);

        if (!isEdit) {
          updatedverificationData(matchResults);
        }
      }
    }
  }, [data, updatedverificationData, isEdit, responseData]);

  if (!data && !error && !errorMessage) {
    return null;
  }

  const onChange = (e, id) => {
    const temp = [...matchResults];
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].name === id) {
        delete temp[i].value;
        temp[i].value = e.toUpperCase();
      }
    }
    updatedverificationData(temp);
    // setMatchResults(temp);
  };

  return (
    <Box display="flex" flexDirection="column" width="100%" margin="10px 0">
      <Box padding="5px">
        {error ? (
          <Text className={classes.errorText}>{errorMessage}</Text>
        ) : data ? (
          <TableContainer>
            <Table size="small" aria-label="a dense table">
              <TableBody>
                {matchResults?.map((row) => (
                  <TableRow key={row.name} style={{ verticalAlign: "center" }}>
                    <TableCell
                      size="small"
                      className={
                        row.matchResult === "Success" || row.matchResult === "NA"
                          ? classes.greenCell
                          : classes.redCell
                      }
                    >
                      <Text>{row.name}</Text>
                    </TableCell>
                    <TableCell
                      size="small"
                      className={
                        row.matchResult === "Success" || row.matchResult === "NA"
                          ? classes.greenCell
                          : classes.redCell
                      }
                    >
                      {!isEdit ? (
                        <Text textAlign="right">{row.value}</Text>
                      ) : (
                        <InputField
                          noMargin
                          labelHide
                          defaultValue={row.value}
                          // style={{ textTransform: "uppercase" }}
                          // value={row.value}
                          onChange={(e) => onChange(e.target.value, row.name)}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
      </Box>
    </Box>
  );
};

export default withStyles(styles)(VideoKycResponse);
