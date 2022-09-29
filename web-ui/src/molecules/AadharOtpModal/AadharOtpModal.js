import React from "react";

import { ErrorMessage, Form, Formik } from "formik";
import Modal from "react-modal";
import OtpInput from "react-otp-input";

import { Box, Text, Button, Grid } from "atoms";
import { BoxStyle } from "../../pages/VideoKycLogin/Components/OtpModal";

const customStyles = {
  content: {
    border: 0,
    padding: 0,
    top: "50%",
    left: "50%",
    right: "auto",
    width: "100%",
    bottom: "auto",
    maxWidth: "530px",
    boxShadow: "none",
    overflow: "initial",
    marginRight: "-50%",
    borderRadius: "4px",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    zIndex: 30,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

export const AadharOtpModal = ({ isOpen, onClose, onSubmit, loading, error }) => {
  // const onSubmit = () => {};
  return (
    <Modal isOpen={isOpen} onClose={onClose} style={customStyles} onRequestClose={onClose}>
      <Box>
        <Box bg="blue.900" p="26px 36px" borderTopLeftRadius="4px" borderTopRightRadius="4px">
          <Text as="h3" fontWeight="500" fontSize="24px" color="white" my={0}>
            Aadhaar OTP
          </Text>
        </Box>
        <Box p="20px 36px 40px">
          <Text as="h4" fontWeight="600" fontSize="18px" color="darkgrey.900" py="20px">
            To Verify the Aadhaar data please enter the OTP
          </Text>

          <Formik
            initialValues={{
              otp: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.otp) {
                errors.otp = "OTP required";
                return errors;
              }
              if (values.otp.length < 6) {
                errors.otp = "Invalid OTP";
                return errors;
              }
              return errors;
            }}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <BoxStyle>
                  <Text
                    as="h5"
                    style={{ fontWeight: "500" }}
                    color="rgba(17, 17, 17, 0.8)"
                    fontSize="14px"
                  >
                    OTP
                  </Text>
                  <OtpInput
                    isInputNum
                    numInputs={6}
                    shouldAutoFocus
                    value={values.otp}
                    inputStyle="input-style"
                    containerStyle="otp-container"
                    onChange={(v) => setFieldValue("otp", v)}
                  />
                  <Box color="red.500">{error ? "Invalid OTP" : <ErrorMessage name="otp" />}</Box>
                  <Grid gridAutoFlow="column" gridGap="20px">
                    <Button
                      variant="secondary"
                      width="100%"
                      px="30px"
                      type="button"
                      height="55px"
                      mt="30px"
                      mx="auto"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      width="100%"
                      px="30px"
                      type="submit"
                      height="55px"
                      mt="30px"
                      mx="auto"
                      loading={loading}
                    >
                      Continue
                    </Button>
                  </Grid>
                </BoxStyle>
              </Form>
            )}
          </Formik>
        </Box>
        {/* <Flex
          bg="lightgrey.300"
          p="26px 36px"
          borderBottomLeftRadius="4px"
          borderBottomRightRadius="4px"
        >
          <Button variant="primary" width="fit-content" px="20px" height="40px">
            CONTINUE
          </Button>
        </Flex> */}
      </Box>
    </Modal>
  );
};
