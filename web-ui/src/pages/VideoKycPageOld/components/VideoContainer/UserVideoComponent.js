import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import OpenViduVideoComponent from './OvVideo';

const styles = {
    participantName: {
        background: 'rgb(0, 0, 0, .4)',
    },
};

const UserVideoComponent = ({ classes, streamManager, height }) => {
    if (!streamManager) {
        return null;
    }

    const getNicknameTag = () => {
        const connectionData = JSON.parse(streamManager.stream.connection.data);

        return `${connectionData.clientData} (${connectionData.loginType})`;
    };

    return (
        <Box position="relative" display="flex" width="100%">
            <OpenViduVideoComponent
                streamManager={streamManager}
                height={height}
            />
            <Box
                position="absolute"
                top={0}
                padding="2px 5px"
                color="white"
                className={classes.participantName}
            >
                <Typography variant="caption">{getNicknameTag()}</Typography>
            </Box>
        </Box>
    );
};

export default withStyles(styles)(UserVideoComponent);
