import React from 'react';
import {
    Box,
    Card,
    CircularProgress,
    Icon,
    Paper,
    Table,
    Typography,
    IconButton,
} from '../../components';
import { StyledTableCell, StyledTableRow } from './AgentStyle';

const AgentPageView = ({
    onRefreshClick,
    onJoinClick,
    requestListPending,
    requestListData,
}) => {
    const renderRows = () =>
        requestListData.map((row, index) => (
            <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                    {row.id}
                </StyledTableCell>
                <StyledTableCell>{row.initiatedBy}</StyledTableCell>
                <StyledTableCell>{row.mobileNumber}</StyledTableCell>
                <StyledTableCell>{row.videoKYCRequestStatus}</StyledTableCell>
                <StyledTableCell>
                    <Box>
                        <IconButton
                            aria-label="detail"
                            onClick={() => onJoinClick(row)}
                        >
                            <Icon iconName="sendSharp" />
                        </IconButton>
                    </Box>
                </StyledTableCell>
            </StyledTableRow>
        ));

    const renderEmptyState = () => (
        <StyledTableRow>
            <StyledTableCell
                component="th"
                scope="row"
                colspan="5"
                align="center"
            >
                No record found!
            </StyledTableCell>
        </StyledTableRow>
    );

    const renderContent = () => {
        if (requestListPending) {
            return (
                <Box textAlign="center">
                    <CircularProgress color="primary" />
                </Box>
            );
        }

        return (
            <Box display="flex" flexDirection="column">
                <Card>
                    <Box>
                        <Table.Container component={Paper}>
                            <Table aria-label="customized table">
                                <Table.Head>
                                    <Table.Row>
                                        <StyledTableCell>Id</StyledTableCell>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>
                                            Mobile no.
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            Status
                                        </StyledTableCell>
                                        <StyledTableCell>Join</StyledTableCell>
                                    </Table.Row>
                                </Table.Head>
                                <Table.Body>
                                    {requestListData &&
                                    requestListData.length > 0
                                        ? renderRows()
                                        : renderEmptyState()}
                                </Table.Body>
                            </Table>
                        </Table.Container>
                    </Box>
                </Card>
            </Box>
        );
    };

    return (
        <Box flex="1" flexGrow="1" p={2}>
            <Box display="flex" justifyContent="space-between" p={1}>
                <Box p={1}>
                    <Typography variant={'h5'}>Customer requests</Typography>
                </Box>
                <Box textAlign="right">
                    <IconButton
                        color="primary"
                        size="xlarge"
                        variant="contained"
                        onClick={() => onRefreshClick()}
                    >
                        <Icon iconName="cached" />
                    </IconButton>
                </Box>
            </Box>
            {renderContent()}
        </Box>
    );
};

export default AgentPageView;
