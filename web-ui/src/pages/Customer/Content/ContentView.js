import React from 'react';

import {
    Box,
    CButton,
    Divider,
    Grid,
    Icon,
    List,
    Paper,
    Typography,
    CircularProgress,
} from '../../../components';

const ContentView = ({
    onBackClick,
    onStartNewVideoKycClick,
    pendingState,
}) => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100%' }}
        >
            <Grid item xs={12}>
                <Paper>
                    <Box padding="20px">
                        <Typography
                            variant="h4"
                            component="h2"
                            gutterBottom
                            color="primary"
                        >
                            Welcome to Video-KYC process
                        </Typography>
                        <Divider />
                        <Box margin="10px 0">
                            <Typography variant="subtitle1" gutterBottom>
                                Please follow the below instructions:
                            </Typography>
                        </Box>
                        <List dense>
                            <List.Item>
                                <List.Item.Text primary="Please do not move away from this browser or open another app till you get connected to our Banking Agent." />
                            </List.Item>
                            <List.Item>
                                <List.Item.Text primary="Please ensure you are in a good network spot or connected to a stable internet connection." />
                            </List.Item>
                            <List.Item>
                                <List.Item.Text primary="In case all our Agents are busy, you might have to wait for a few mins." />
                            </List.Item>
                            <List.Item>
                                <List.Item.Text primary="Once you are connected to our Banking Agent, you will receive a Video Call Invitation." />
                            </List.Item>
                            <List.Item>
                                <List.Item.Text primary="Please keep original documents along with you to complete process on time." />
                            </List.Item>
                            <List dense>
                                <List.Item>
                                    <List.Item.Icon>
                                        <Icon iconName="chevronRight" />
                                    </List.Item.Icon>
                                    <List.Item.Text primary="Pan card" />
                                </List.Item>
                                <List.Item>
                                    <List.Item.Icon>
                                        <Icon iconName="chevronRight" />
                                    </List.Item.Icon>
                                    <List.Item.Text primary="ADHAR card" />
                                </List.Item>
                                <List.Item>
                                    <List.Item.Icon>
                                        <Icon iconName="chevronRight" />
                                    </List.Item.Icon>
                                    <List.Item.Text primary="Blank paper and pen" />
                                </List.Item>
                            </List>
                        </List>
                        <Divider />

                        <Box
                            margin="10px 0 0"
                            display="flex"
                            justifyContent="flex-end"
                        >
                            <Box display="flex">
                                <Box padding="0 10px 0">
                                    <CButton
                                        variant="ghost"
                                        color="secondary"
                                        onClick={onBackClick}
                                    >
                                        Back
                                    </CButton>
                                </Box>
                                <CButton
                                    color="primary"
                                    onClick={onStartNewVideoKycClick}
                                    disabled={pendingState}
                                >
                                    {pendingState && (<CircularProgress size={20} />)}
                                        &nbsp;&nbsp;Proceed
                                </CButton>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ContentView;
