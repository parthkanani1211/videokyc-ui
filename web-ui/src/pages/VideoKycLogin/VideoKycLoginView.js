import React from "react";
import { Formik } from "formik";
import { Loadable } from "../../common/loadable";

import { Box, Button, Flex, Text } from "atoms";

import OtpModal from "./Components/OtpModal";

import { getLogo } from "util/image";
import { FormInput } from "molecules";

const VideoKycLoginView = ({
  open,
  loginData,
  initialValue,
  loginPending,
  handleOtpClose,
  sessionPending,
  handleOtpSubmit,
  loginErrorMessage,
  handleLoginSubmit,
  authenticatePending,
  authenticateErrorMessage,
}) => {
  return (
    <Loadable loading={sessionPending}>
      {/* <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <div className="logo-container">
                      <img width="250" height="70" alt="logo" src={getLogo()} />
                    </div>
                    <Formik
                      initialValues={{
                        mobileNumber: "",
                      }}
                      validate={(values) => {
                        const errors = {};
                        const phoneno = /^\d{10}$/;

                        if (!values.mobileNumber) {
                          errors.mobileNumber = "Mobile Number is required";
                        } else if (!phoneno.test(values.mobileNumber)) {
                          errors.mobileNumber = "Invlid number";
                        }

                        return errors;
                      }}
                      onSubmit={(values) => {
                        handleLoginSubmit(values);
                      }}
                    >
                      {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                          <Box>
                            <TextField
                              autoFocus
                              error={Boolean(touched.mobileNumber && errors.mobileNumber)}
                              helperText={errors.mobileNumber}
                              label="Mobile No."
                              name="mobileNumber"
                              fullWidth
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.mobileNumber}
                              disabled={loginData !== null}
                            />
                          </Box>
                          <Box textAlign="center" p={2}>
                            {loginPending ? (
                              <CircularProgress size={20} />
                            ) : (
                              loginData === null && (
                                <CButton
                                  color="primary"
                                  type="submit"
                                  disabled={loginData !== null}
                                >
                                  Continue
                                </CButton>
                              )
                            )}
                          </Box>
                        </form>
                      )}
                    </Formik>
                    {open && loginData != null && (
                      <OtpModal
                        open={open && loginData != null}
                        handleClose={handleOtpClose}
                        data={loginData}
                        authenticatePending={authenticatePending}
                        authenticateErrorMessage={authenticateErrorMessage}
                        handleOtpSubmit={handleOtpSubmit}
                      />
                    )}
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div> */}

      <Flex
        className="login-page-wrapper"
        // height="100%"
        // width="100vw"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Flex
          width={{ xs: "94vw", md: "575px" }}
          bg="rgba(255, 255, 255, 0.1)"
          boxShadow="0px 4px 24px rgba(0, 0, 0, 0.15)"
          justifyContent="center"
          borderRadius="10px"
          p="20px"
        >
          <Box
            bg="white"
            borderRadius="10px"
            px={{ xs: "20px", md: "35px" }}
            py={{ xs: "30px", md: "50px" }}
            height="100%"
            width="100%"
          >
            <Flex className="logo-image" mx="auto">
              <Box as="img" maxWidth="200px" maxHeight="70px" alt="logo" src={getLogo()} />
            </Flex>
            <Box mt="4rem">
              <Formik
                initialValues={
                  initialValue || {
                    mobileNumber: "",
                  }
                }
                validate={(values) => {
                  const errors = {};
                  const phoneno = /^\d{10}$/;

                  if (!values.mobileNumber) {
                    errors.mobileNumber = "Mobile Number is required";
                  } else if (!phoneno.test(values.mobileNumber)) {
                    errors.mobileNumber = "Invalid Number";
                  }

                  return errors;
                }}
                onSubmit={(values) => {
                  handleLoginSubmit(values);
                }}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Box>
                      <Text
                        as="h5"
                        style={{ fontWeight: "500" }}
                        color="rgba(17, 17, 17, 0.8)"
                        fontSize="14px"
                      >
                        Mobile No.
                      </Text>
                      <FormInput
                        error={Boolean(touched.mobileNumber && errors.mobileNumber)}
                        helperText={errors.mobileNumber}
                        label="Mobile No."
                        name="mobileNumber"
                        placeholder="Enter Mobile No."
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.mobileNumber}
                        disabled={loginData !== null || initialValue}
                        style={{ height: "55px" }}
                        labelHide
                        type="number"
                        pattern="[0-9]*"
                        maxLength={10}
                      />
                    </Box>
                    {loginErrorMessage && (
                      <Box textAlign="center" mb="1rem">
                        <Text fontSize="0.8rem" color="red.500">
                          {loginErrorMessage}
                        </Text>
                      </Box>
                    )}
                    <Box textAlign="center">
                      {loginData === null && (
                        <Button
                          variant="primary"
                          width="100%"
                          type="submit"
                          height="55px"
                          disabled={loginData !== null}
                          loading={loginPending}
                        >
                          CONTINUE
                        </Button>
                      )}
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
            {open && loginData != null && (
              <OtpModal
                data={loginData}
                handleClose={handleOtpClose}
                open={open && loginData != null}
                handleOtpSubmit={handleOtpSubmit}
                authenticatePending={authenticatePending}
                authenticateErrorMessage={authenticateErrorMessage}
              />
            )}
          </Box>
        </Flex>
      </Flex>
      {/* {loginData !== null && (
          <Box height="40px" bg="rgba(2, 19, 85, 1)">
            <Text as="h6" pt="14px" color="white" textAlign="center" fontSize="12px">
              Copyright 2020 Obvious. All Rights Reserved.
            </Text>
          </Box>
        )} */}
    </Loadable>
  );
};

export default VideoKycLoginView;
