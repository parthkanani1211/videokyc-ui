import React from 'react';

import VideoKycView from './VideoKycView';

const VideoKycContainer = (props) => {
    const handleLoginTypeButtonClick = (type) => {
        const { history } = props;

        history.push(`/${type}/login`);
    };

    return <VideoKycView onLoginTypeButtonClick={handleLoginTypeButtonClick} />;
};

export default VideoKycContainer;
