import React, { useRef, useEffect } from "react";

const OvVideo = ({ streamManager, height = "100%" }) => {
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
        // maxWidth: "100%",
        // maxHeight: height,
        // objectFit: "fill",
        background: "black",
        margin: "auto",
        width: "100%",
        objectFit: "cover",
        height: "100%",
      }}
    />
  );
};

export default OvVideo;
