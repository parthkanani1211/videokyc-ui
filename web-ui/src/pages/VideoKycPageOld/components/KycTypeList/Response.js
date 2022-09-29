import React from 'react';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';

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

const VideoKycResponse = ({ data, error, errorMessage, classes }) => {
    if (!data && !error && !errorMessage) {
        return null;
    }

    const renderContent = () => {
        if (error) {
            return (
                <Typography className={classes.errorText}>
                    {errorMessage}
                </Typography>
            );
        }

        if (!data) {
            return null;
        }

        const { kycVerificationData } = data;
        const { matchResults } = kycVerificationData;

        return (
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        {matchResults.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell
                                    size="small"
                                    className={
                                        row.matchResult === 'Success'
                                            ? classes.greenCell
                                            : classes.redCell
                                    }
                                >
                                    {row.name}
                                </TableCell>
                                <TableCell
                                    size="small"
                                    className={
                                        row.matchResult === 'Success'
                                            ? classes.greenCell
                                            : classes.redCell
                                    }
                                >
                                    {row.actualValue}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <Box display="flex" flexDirection="column" width="100%" margin="10px 0">
            <Paper>
                <Box padding="5px">{renderContent()}</Box>
            </Paper>
        </Box>
    );
};

export default withStyles(styles)(VideoKycResponse);
