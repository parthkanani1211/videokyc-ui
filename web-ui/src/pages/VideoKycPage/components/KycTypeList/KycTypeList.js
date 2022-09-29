import React, { useEffect, useRef, useState } from "react";
// import { withStyles } from "@material-ui/core/styles";
// import Box from "@material-ui/core/Box";
// import Stepper from "@material-ui/core/Stepper";
// import Step from "@material-ui/core/Step";
// import StepLabel from "@material-ui/core/StepLabel";
// import StepContent from "@material-ui/core/StepContent";
// import Button from "@material-ui/core/Button";
// import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { KYC_DOCUMENT_LIST } from "../../../../store/constants/videoKyc";
import ImageCaptureContainer from "./ImageCaptureContainer";

import { Box, Grid, Button, Text } from "atoms";

const KycTypeList = ({
  classes,
  videoKycData,
  sendMessage,
  subscribers,
  onExtractClick,
  onCompleteClick,
  currentStep,
  loading,
  onVerifyClick,
}) => {
  const [activeStep, setActiveStep] = useState(currentStep);
  const [editMode, setEditMode] = useState(false);
  const [updatedResponse, setUpdatedResponse] = useState();

  const handleVerify = (type) => {
    let verifyType = type.toLowerCase();
    let data = videoKycData[type]?.data?.kycVerificationData;
    data = {
      ...data,
      matchResults: updatedResponse,
    };

    onVerifyClick(data, verifyType);
    setEditMode(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setEditMode(false);
  };

  const isNextDisabled = (type) => {
    if (type === "PAN" || type === "AADHAR") {
      return !videoKycData[type]?.responseData?.verified;
    }
    return !videoKycData[type]?.data?.kycVerificationData?.verified;
  };

  // const updated = (e) => {
  //     setUpdatedResponse(e)
  // }
  useEffect(() => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep, currentStep));
  }, [currentStep]);

  return (
    // <Stepper
    //   activeStep={activeStep}
    //   // orientation="horizontal"
    //   className={classes.stepperContainer}
    // >
    //   {KYC_DOCUMENT_LIST.map(({ label, type, frontAndBack }) => {
    //     return (
    //       <Step key={type}>
    //         <StepLabel>{label}</StepLabel>
    //         <StepContent>
    //           <ImageCaptureContainer
    //             kycType={type}
    //             verificationData={videoKycData[type]}
    //             sendMessage={sendMessage}
    //             subscribers={subscribers}
    //             onExtractClick={onExtractClick}
    //             frontAndBack={frontAndBack}
    //             isEditMode={editMode}
    //             updatedverificationData={setUpdatedResponse}
    //             handleEdit={handleEdit}
    //             handleEditDisabled={!videoKycData[type]?.data}
    //             handleVerify={() => handleVerify(type)}
    //             handleVerifyDisabled={!videoKycData[type]?.data}
    //           />
    //           <Box margin="5px 0" display="flex" justifyContent="space-between">
    //             <Button
    //               disabled={activeStep === 0}
    //               onClick={handleBack}
    //               size="small"
    //               fullWidth={true}
    //             >
    //               Back
    //             </Button>
    //             &nbsp;
    //             <Button
    //               variant="contained"
    //               color="primary"
    //               disabled={isNextDisabled(type)}
    //               onClick={handleNext}
    //               size="small"
    //               fullWidth={true}
    //             >
    //               Next
    //             </Button>
    //           </Box>
    //         </StepContent>
    //       </Step>
    //     );
    //   })}
    //   <br />
    //   <Button
    //     variant="contained"
    //     color="primary"
    //     disabled={activeStep < 3 || isNextDisabled("SIGN")}
    //     endIcon={<NavigateNextIcon />}
    //     onClick={onCompleteClick}
    //   >
    //     Complete
    //   </Button>
    // </Stepper>
    <Box p={{ xs: "15px 20px", md: "27px 48px" }} width="100%">
      <Grid gridAutoFlow="column" justifyContent="space-between" width="100%">
        {KYC_DOCUMENT_LIST.map(({ label }, index, arr) => (
          <React.Fragment key={label}>
            <Box color={activeStep >= index ? "blue.500" : "#111111"}>{label}</Box>
            {index !== arr.length - 1 && (
              <Box color={activeStep >= index ? "blue.500" : "#111111"}>&gt;</Box>
            )}
          </React.Fragment>
        ))}
      </Grid>
      <Box>
        {activeStep <= 3 ? (
          <ImageCaptureContainer
            kycType={KYC_DOCUMENT_LIST[activeStep]?.type}
            verificationData={videoKycData[KYC_DOCUMENT_LIST[activeStep]?.type]}
            sendMessage={sendMessage}
            subscribers={subscribers}
            onExtractClick={onExtractClick}
            frontAndBack={KYC_DOCUMENT_LIST[activeStep]?.frontAndBack}
            isEditMode={editMode}
            updatedverificationData={setUpdatedResponse}
            handleEdit={handleEdit}
            handleEditDisabled={!videoKycData[KYC_DOCUMENT_LIST[activeStep]?.type]?.data}
            handleVerify={() => handleVerify(KYC_DOCUMENT_LIST[activeStep]?.type)}
            handleVerifyDisabled={!videoKycData[KYC_DOCUMENT_LIST[activeStep]?.type]?.data}
          />
        ) : (
          <Box mt="40px">
            <Text as="p">
              Video KYC steps captured successfully. Please click on 'Complete' button to submit the
              Video KYC request to Checker.
            </Text>
            <Text as="p">
              Note : Once you will complete the session, video KYC session will be ended and you
              will not be able to edit any steps.
            </Text>
          </Box>
        )}
        <Box margin="5px 0" display="flex" justifyContent="flex-end">
          {activeStep <= 3 ? (
            <>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="secondary"
                width="max-content"
                py="5px"
              >
                Back
              </Button>
              <Button
                disabled={isNextDisabled(KYC_DOCUMENT_LIST[activeStep]?.type)}
                onClick={handleNext}
                width="max-content"
                ml="15px"
                py="5px"
              >
                Next
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              color="primary"
              onClick={onCompleteClick}
              width="fit-content"
              py="5px"
            >
              Complete
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// export default withStyles(styles)(KycTypeList);
export default KycTypeList;
