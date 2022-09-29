import React, { useRef, useEffect } from 'react';

const OvVideo = ({ streamManager, height = '100%' }) => {
    const videoRef = useRef();

    useEffect(() => {
        if (streamManager && !!videoRef) {
            streamManager.addVideoElement(videoRef.current);
        }
    }, [streamManager]);

    return (
        <video
            autoPlay={true}
            ref={videoRef}
            style={{
                width: '100%',
                height,
                objectFit: 'fill',
            }}
        />
    );
};

export default OvVideo;
