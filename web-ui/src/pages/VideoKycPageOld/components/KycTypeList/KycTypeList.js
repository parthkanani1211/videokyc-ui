import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { KYC_DOCUMENT_LIST } from '../../../../store/constants/videoKyc';
import ImageCaptureContainer from './ImageCaptureContainer';

const styles = {
    stepperContainer: {
        width: '100%',
        overflow: 'scroll',
    },
};

const KycTypeList = ({
    classes,
    videoKycData,
    sendMessage,
    subscribers,
    onVerifyClick,
    onCompleteClick,
}) => {
    const [activeStep, setActiveStep] = useState(5);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Stepper
            activeStep={activeStep}
            orientation="vertical"
            className={classes.stepperContainer}
        >
            {KYC_DOCUMENT_LIST.map(({ label, type, frontAndBack }) => (
                <Step key={type}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                        <ImageCaptureContainer
                            kycType={type}
                            verificationData={videoKycData[type]}
                            sendMessage={sendMessage}
                            subscribers={subscribers}
                            onVerifyClick={onVerifyClick}
                            frontAndBack={frontAndBack}
                        />
                        <Box
                            margin="5px 0"
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                size="small"
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={!videoKycData[type].isVerified}
                                onClick={handleNext}
                                size="small"
                            >
                                Next
                            </Button>
                        </Box>
                    </StepContent>
                </Step>
            ))}
            <br />
            <Button
                variant="contained"
                color="primary"
                disabled={activeStep < 3}
                endIcon={<NavigateNextIcon />}
                onClick={onCompleteClick}
            >
                Complete
            </Button>
        </Stepper>
    );
};

export default withStyles(styles)(KycTypeList);
