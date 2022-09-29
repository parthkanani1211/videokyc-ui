import React, { useEffect, useRef, useState } from "react";

import { Box } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import { Box as CBox, Flex as CFlex } from "atoms";
import ExtractIcon from "assets/icons/ExtractIcon";
import CaptureIcon from "assets/icons/CaptureIcon";

import { CUSTOMER_DOCUMENT_STATUSES } from "../../../../store/constants/videoKyc";

import Response from "./Response";

const styles = {
  canvas: {
    width: "100%",
    height: "100%",
    maxHeight: "250px",
    background: "gray",
    objectFit: "cover",
    borderRadius: "10px",
  },
  photoButton: {
    padding: 0,
    width: "50px",
    height: "50px",
    marginTop: "10px",
    cursor: "pointer",
    borderRadius: "50px",
    border: "0.5px solid",
    marginBottom: "3px",
  },
};

const ImageCaptureContainer = ({
  classes,
  kycType,
  verificationData,
  sendMessage,
  subscribers,
  frontAndBack = false,
  onExtractClick,
  isEditMode,
  updatedverificationData,
  handleEdit,
  handleEditDisabled,
  handleVerify,
  handleVerifyDisabled,
}) => {
  const frontCanvasRef = useRef();
  const backCanvasRef = useRef();
  const imageRef = useRef({});

  // const enlargeCanvasRef = useRef();

  const [isFrontCaptured, setFrontCaptured] = useState(false);
  const [isBackCaptured, setBackCaptured] = useState(!frontAndBack);
  const [isEnlargeImage, setEnlargeImage] = useState(null);
  // const [images, setImages] = useState({
  //   front: '',
  //   back: ''
  // });

  useEffect(() => {
    const frontImg = imageRef?.current?.[kycType]?.[0];
    const backImg = imageRef?.current?.[kycType]?.[1];
    setFrontCaptured(Boolean(frontImg));
    if (frontImg) {
      processFrame(frontCanvasRef)(frontImg);
    }
    setBackCaptured(Boolean(backImg || !frontAndBack));
    if (backImg) {
      processFrame(backCanvasRef)(backImg);
    }
  }, [kycType, frontAndBack]);

  const handlePrimaryCapture = (canvasRef, type = 0) => {
    handleCaptureImage(canvasRef, type);

    if (kycType === "FACE") {
      setTimeout(() => {
        handleCaptureImage(backCanvasRef, 1);
        setBackCaptured(true);
      }, 300);
    }
  };

  const handleCaptureImage = (canvasRef, type) => {
    sendMessage(kycType, CUSTOMER_DOCUMENT_STATUSES.IN_PROGRESS);

    const videoTrack = subscribers[0].stream.getMediaStream().getVideoTracks()[0];
    if (ImageCapture) {
      const imageCapture = new ImageCapture(videoTrack);

      imageCapture
        .grabFrame()
        .then((img) => {
          processFrame(canvasRef)(img);
          imageRef.current[kycType] = imageRef.current[kycType] || [];
          imageRef.current[kycType][type] = img;
        })
        .catch((e) => {});
    }
  };

  const processFrame = (canvasRef) => (imgData) => {
    canvasRef.current.width = imgData.width;
    canvasRef.current.height = imgData.height;
    canvasRef.current.getContext("2d").drawImage(imgData, 0, 0);
    // this.setState({ isImageCaptured: true });

    // this.sendMessage(KYC_DOCUMENT_TYPES.PAN, 'Image captured');
  };

  return (
    <React.Fragment>
      <Box display="flex" padding="5px 0" flexDirection="column-reverse" justifyContent="center">
        <Box display="grid" gridAutoFlow="column" gridGap="20px" justifyContent="center">
          {/* <Tooltip title="Capture" placement="bottom" arrow> */}
          {kycType !== "FACE" && (
            <CBox>
              <CFlex
                disabled={!subscribers.length}
                onClick={() => {
                  handlePrimaryCapture(frontCanvasRef);
                  setFrontCaptured(true);
                }}
                alignItems="center"
                justifyContent="center"
                suppressHydrationWarning
                style={{
                  backgroundColor: "#DDECFF",
                  color: "#006CFB",
                  borderColor: subscribers.length ? "#006CFB" : "transparent",
                }}
                className={classes.photoButton}
              >
                <CaptureIcon width="20px" height="20px" color="#006CFB" />
              </CFlex>
              <CBox fontSize="12px" borderRadius="4px" textAlign="center">
                Capture
              </CBox>
            </CBox>
          )}
          {/* </Tooltip> */}
          {/* <Tooltip title="Extract" placement="bottom" arrow> */}
          {!frontAndBack && (
            <CBox display="grid" justifyContent="center">
              <IconButton
                disabled={!(isFrontCaptured && isBackCaptured) || verificationData?.pending}
                onClick={() => {
                  onExtractClick(kycType, frontCanvasRef, backCanvasRef);
                }}
                className={classes.photoButton}
                style={{
                  backgroundColor: "#FFE3BA",
                  color: "#FF9900",
                  borderColor:
                    (isFrontCaptured && isBackCaptured) || verificationData?.pending
                      ? "#FF9900"
                      : "transparent",
                }}
              >
                {verificationData?.extractPending ? (
                  <CircularProgress size={15} />
                ) : (
                  <ExtractIcon width="20px" />
                )}
              </IconButton>
              <CBox fontSize="12px" borderRadius="4px" textAlign="center">
                Extract
              </CBox>
            </CBox>
          )}
          {/* </Tooltip> */}
          {(kycType === "AADHAR" || kycType === "PAN") && !frontAndBack && (
            <>
              <CBox>
                {/* <Tooltip title="Edit" placement="bottom" arrow> */}
                <IconButton
                  disabled={handleEditDisabled}
                  onClick={handleEdit}
                  className={classes.photoButton}
                  style={{
                    backgroundColor: "rgba(215, 228, 255, 0.6)",
                    color: "rgba(110, 110, 255, 1)",
                    borderColor: !handleEditDisabled ? "rgba(110, 110, 255, 1)" : "transparent",
                  }}
                >
                  <EditIcon />
                </IconButton>
                <CBox fontSize="12px" borderRadius="4px" textAlign="center">
                  Edit
                </CBox>
              </CBox>
              {/* </Tooltip>
              <Tooltip title="Verify" placement="bottom" arrow> */}
              <CBox>
                <IconButton
                  disabled={handleVerifyDisabled}
                  onClick={handleVerify}
                  className={classes.photoButton}
                  style={{
                    backgroundColor: "#D5F7E2",
                    color: "green",
                    borderColor: !handleVerifyDisabled ? "green" : "transparent",
                  }}
                >
                  {verificationData?.pending ? <CircularProgress size={15} /> : <CheckIcon />}
                </IconButton>
                <CBox fontSize="12px" borderRadius="4px" textAlign="center">
                  Verify
                </CBox>
              </CBox>
              {/* </Tooltip> */}
            </>
          )}
        </Box>
        <CBox
          maxWidth="100%"
          flex={1}
          onClick={() => isFrontCaptured && setEnlargeImage(frontCanvasRef)}
          mt="20px"
          _hover={{
            "& > div": {
              opacity: 1,
            },
          }}
        >
          <canvas ref={frontCanvasRef} className={classes.canvas} key={kycType} />

          {isFrontCaptured && (
            <CBox
              display="flex"
              transition="0.3s all"
              opacity={0}
              alignItems="center"
              justifyContent="center"
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="5px"
              borderRadius="10px"
              cursor="pointer"
              bg="rgba(0,0,0,0.3)"
            >
              <CBox
                borderRadius="4px"
                border="1px solid"
                borderColor="white"
                color="white"
                bg="rgba(0,0,0,0.3)"
                p="7px 20px"
              >
                Enlarge
              </CBox>
            </CBox>
          )}
        </CBox>
      </Box>

      {frontAndBack ? (
        <Box display="flex" padding="5px 0" flexDirection="column-reverse">
          <Box display="grid" justifyContent="center" gridAutoFlow="column" gridGap="20px">
            {kycType === "FACE" && (
              <CBox>
                <CFlex
                  disabled={!subscribers.length}
                  onClick={() => {
                    handlePrimaryCapture(frontCanvasRef);
                    setFrontCaptured(true);
                  }}
                  alignItems="center"
                  justifyContent="center"
                  suppressHydrationWarning
                  style={{
                    backgroundColor: "#DDECFF",
                    color: "#006CFB",
                    borderColor: subscribers.length ? "#006CFB" : "transparent",
                  }}
                  className={classes.photoButton}
                >
                  <CaptureIcon width="20px" height="20px" color="#006CFB" />
                </CFlex>
                <CBox fontSize="12px" borderRadius="4px" textAlign="center">
                  Capture
                </CBox>
              </CBox>
            )}
            {kycType !== "FACE" && (
              <CBox>
                <IconButton
                  disabled={!subscribers.length || kycType === "FACE"}
                  onClick={() => {
                    handleCaptureImage(backCanvasRef, 1);
                    setBackCaptured(true);
                  }}
                  className={classes.photoButton}
                  style={{
                    backgroundColor: "#DDECFF",
                    color: "#006CFB",
                    borderColor:
                      (isFrontCaptured && isBackCaptured) || verificationData?.pending
                        ? "#006CFB"
                        : "transparent",
                  }}
                >
                  <CaptureIcon width="20px" height="20px" color="#006CFB" />
                </IconButton>
                <CBox fontSize="12px" borderRadius="4px" textAlign="center">
                  Capture
                </CBox>
              </CBox>
            )}
            <CBox>
              <IconButton
                disabled={!(isFrontCaptured && isBackCaptured) || verificationData?.pending}
                onClick={() => {
                  onExtractClick(kycType, frontCanvasRef, backCanvasRef);
                }}
                className={classes.photoButton}
                style={{
                  backgroundColor: "#FFE3BA",
                  color: "#FF9900",
                  borderColor:
                    (isFrontCaptured && isBackCaptured) || verificationData?.pending
                      ? "#FF9900"
                      : "transparent",
                }}
              >
                {verificationData?.extractPending ? (
                  <CircularProgress size={15} />
                ) : (
                  <ExtractIcon width="20px" />
                )}
              </IconButton>
              <CBox fontSize="12px" borderRadius="4px" textAlign="center">
                Extract
              </CBox>
            </CBox>
            {(kycType === "AADHAR" || kycType === "PAN") && (
              <>
                <CBox>
                  {/* <Tooltip title="Edit" placement="bottom" arrow> */}
                  <IconButton
                    disabled={handleEditDisabled}
                    onClick={handleEdit}
                    className={classes.photoButton}
                    style={{
                      backgroundColor: "rgba(215, 228, 255, 0.6)",
                      color: "rgba(110, 110, 255, 1)",
                      borderColor: !handleEditDisabled ? "rgba(110, 110, 255, 1)" : "transparent",
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <CBox fontSize="12px" borderRadius="4px" textAlign="center">
                    Edit
                  </CBox>
                </CBox>
                {/* </Tooltip>
              <Tooltip title="Verify" placement="bottom" arrow> */}
                <CBox>
                  <IconButton
                    disabled={handleVerifyDisabled}
                    onClick={handleVerify}
                    className={classes.photoButton}
                    style={{
                      backgroundColor: "#D5F7E2",
                      color: "green",
                      borderColor: !handleVerifyDisabled ? "green" : "transparent",
                    }}
                  >
                    {verificationData?.pending ? <CircularProgress size={15} /> : <CheckIcon />}
                  </IconButton>
                  <CBox fontSize="12px" borderRadius="4px" textAlign="center">
                    Verify
                  </CBox>
                </CBox>
                {/* </Tooltip> */}
              </>
            )}
          </Box>
          <CBox
            maxWidth="100%"
            flex={1}
            onClick={() => isBackCaptured && setEnlargeImage(backCanvasRef)}
            mt="20px"
            _hover={{
              "& > div": {
                opacity: 1,
              },
            }}
          >
            <canvas ref={backCanvasRef} className={classes.canvas} key={kycType + 1} />

            {isBackCaptured && (
              <CBox
                display="flex"
                transition="0.3s all"
                opacity={0}
                alignItems="center"
                justifyContent="center"
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="5px"
                borderRadius="10px"
                cursor="pointer"
                bg="rgba(0,0,0,0.3)"
              >
                <CBox
                  borderRadius="4px"
                  border="1px solid"
                  borderColor="white"
                  color="white"
                  bg="rgba(0,0,0,0.3)"
                  p="7px 20px"
                >
                  Enlarge
                </CBox>
              </CBox>
            )}
          </CBox>
        </Box>
      ) : null}
      {isEnlargeImage && (
        <CBox
          position="fixed"
          top="0"
          left="0"
          zIndex="1200"
          background="rgba(0,0,0,0.3)"
          width="100vw"
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center;"
        >
          <CBox>
            <CBox
              as="img"
              maxWidth="100vw"
              maxHeight="100vh"
              src={isEnlargeImage?.current?.toDataURL()}
            />
            <CBox
              top="0px"
              right="15px"
              color="red.500"
              fontSize="50px"
              cursor="pointer"
              position="absolute"
              onClick={() => setEnlargeImage(null)}
            >
              &times;
            </CBox>
          </CBox>
        </CBox>
      )}
      <Response
        data={verificationData?.data}
        responseData={verificationData?.responseData}
        error={verificationData?.error}
        errorMessage={verificationData?.errorMessage}
        isEdit={isEditMode}
        updatedverificationData={updatedverificationData}
      />
    </React.Fragment>
  );
};

export default withStyles(styles)(ImageCaptureContainer);
