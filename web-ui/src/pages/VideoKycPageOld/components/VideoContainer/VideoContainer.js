import React from 'react';

import Box from '@material-ui/core/Box';

import { LOGIN_TYPE } from '../../../../store/constants/videoKyc';

import CustomerStatuses from './CustomerStatuses';
import UserVideoComponent from './UserVideoComponent';

const VideoContainer = ({
    kycStatus,
    height,
    loginType,
    subscriber,
    publisher,
}) => {
    const bigVideoStreamManager =
        loginType === LOGIN_TYPE.AGENT ? subscriber : publisher;
    const smallVideoStreamManager =
        loginType === LOGIN_TYPE.AGENT ? publisher : subscriber;

    return (
        <Box display="flex" flex={3} flexDirection="column" position="relative">
            <Box flex={1} display="flex">
                <UserVideoComponent
                    streamManager={bigVideoStreamManager}
                    height={height}
                />
            </Box>
            <Box
                maxWidth={200}
                maxHeight={200}
                position="absolute"
                bottom={0}
                boxShadow={1}
            >
                <UserVideoComponent streamManager={smallVideoStreamManager} />
            </Box>
            {loginType === LOGIN_TYPE.CUSTOMER && subscriber ? (
                <CustomerStatuses kycStatus={kycStatus} />
            ) : null}
        </Box>
    );
};

export default VideoContainer;
