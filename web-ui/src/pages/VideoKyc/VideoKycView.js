import React from 'react';

import { Box, Grid, Typography, BigButton } from '../../components';
import { LOGIN_TYPE, LOGIN_TYPE_LABEL } from '../../store/constants/videoKyc';

const VideoKycView = ({ onLoginTypeButtonClick }) => (
    <Box display="flex" flexDirection="column" height="100%">
        <Box flexDirection="column" height="100%" textAlign="center">
            <Box pt={4} pb={6}>
                <Typography variant="h4">Join as</Typography>
            </Box>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                height="100%"
            >
                <Grid container justify="center" spacing={8}>
                    <Grid item>
                        <BigButton
                            title={LOGIN_TYPE_LABEL[LOGIN_TYPE.AGENT]}
                            onClick={() =>
                                onLoginTypeButtonClick(LOGIN_TYPE.AGENT)
                            }
                        />
                    </Grid>
                    <Grid item>
                        <BigButton
                            title={LOGIN_TYPE_LABEL[LOGIN_TYPE.CUSTOMER]}
                            onClick={() =>
                                onLoginTypeButtonClick(LOGIN_TYPE.CUSTOMER)
                            }
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Box>
);

export default VideoKycView;
