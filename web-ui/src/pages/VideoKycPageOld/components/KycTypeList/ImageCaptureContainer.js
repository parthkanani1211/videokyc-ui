import React, { useRef, useState } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';

import CheckIcon from '@material-ui/icons/Check';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import { CUSTOMER_DOCUMENT_STATUSES } from '../../../../store/constants/videoKyc';

import Response from './Response';

const styles = {
    canvas: {
        height: '100%',
        width: '100%',
        background: 'gray',
    },
    photoButton: {
        padding: 0,
        marginRight: '5px',
    },
};

const ImageCaptureContainer = ({
    classes,
    kycType,
    verificationData,
    sendMessage,
    subscribers,
    frontAndBack = false,
    onVerifyClick,
}) => {
    const frontCanvasRef = useRef();
    const backCanvasRef = useRef();

    const [isFrontCaptured, setFrontCaptured] = useState(false);
    const [isBackCaptured, setBackCaptured] = useState(!frontAndBack);

    const handleCaptureImage = (canvasRef) => {
        sendMessage(kycType, CUSTOMER_DOCUMENT_STATUSES.IN_PROGRESS);

        const videoTrack = subscribers[0].stream
            .getMediaStream()
            .getVideoTracks()[0];
        const imageCapture = new ImageCapture(videoTrack);

        imageCapture.grabFrame().then(processFrame(canvasRef));
    };

    const processFrame = (canvasRef) => (imgData) => {
        canvasRef.current.width = imgData.width;
        canvasRef.current.height = imgData.height;
        canvasRef.current.getContext('2d').drawImage(imgData, 0, 0);
        // this.setState({ isImageCaptured: true });

        // this.sendMessage(KYC_DOCUMENT_TYPES.PAN, 'Image captured');
    };

    return (
        <React.Fragment>
            <Box display="flex" padding="5px 0">
                <Box flex={0}>
                    <IconButton
                        disabled={!subscribers.length}
                        onClick={() => {
                            handleCaptureImage(frontCanvasRef);
                            setFrontCaptured(true);
                        }}
                        className={classes.photoButton}
                        color="primary"
                    >
                        <PhotoCamera />
                    </IconButton>
                </Box>
                <Box css={{ maxWidth: 240 }} flex={1}>
                    <canvas
                        ref={frontCanvasRef}
                        className={classes.canvas}
                    ></canvas>
                </Box>
            </Box>
            {frontAndBack ? (
                <Box display="flex" padding="5px 0">
                    <Box flex={0}>
                        <IconButton
                            disabled={!subscribers.length}
                            onClick={() => {
                                handleCaptureImage(backCanvasRef);
                                setBackCaptured(true);
                            }}
                            className={classes.photoButton}
                            color="primary"
                        >
                            <PhotoCamera />
                        </IconButton>
                    </Box>
                    <Box css={{ maxWidth: 240 }} flex={1}>
                        <canvas
                            ref={backCanvasRef}
                            className={classes.canvas}
                        ></canvas>
                    </Box>
                </Box>
            ) : null}
            <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={
                    !(isFrontCaptured && isBackCaptured) ||
                    verificationData.pending
                }
                onClick={() =>
                    onVerifyClick(kycType, frontCanvasRef, backCanvasRef)
                }
                startIcon={
                    verificationData.pending ? (
                        <CircularProgress size={20} />
                    ) : (
                        <CheckIcon />
                    )
                }
                fullWidth={true}
            >
                Verify
            </Button>
            <Response
                data={verificationData.data}
                error={verificationData.error}
                errorMessage={verificationData.errorMessage}
            />
        </React.Fragment>
    );
};

export default withStyles(styles)(ImageCaptureContainer);
