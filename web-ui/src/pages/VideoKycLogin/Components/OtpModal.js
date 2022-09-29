import React from "react";
import { Form, Formik } from "formik";
import { Grid } from "../../../components";
import OtpInput from "react-otp-input";
import styled from "styled-components";
import { Text, Box, Button } from "atoms";

export const BoxStyle = styled(Box)`
  .input-style {
    width: 100% !important;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border: 1px solid rgba(17, 17, 17, 0.15);
    background-color: #f9f9f9;
    border-radius: 4px;
    @media only screen and (max-width: 600px) {
      padding-top: 0.7rem;
      padding-bottom: 0.7rem;
      font-size: 16px;
    }
  }
  .otp-container {
    display: grid !important;
    grid-auto-flow: column;
    grid-gap: 14px;
    @media only screen and (max-width: 600px) {
      grid-gap: 5px;
    }
  }
`;
const OtpModal = ({ data, handleOtpSubmit, authenticatePending, authenticateErrorMessage }) => {
  const otp = data?.otpCode?.code;

  return (
    <Formik
      initialValues={{
        otp: otp,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.otp) {
          errors.otp = "OTP required";
        }
        return errors;
      }}
      onSubmit={handleOtpSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <BoxStyle>
            {/* <TextField
              autoFocus
              error={Boolean(touched.otp && errors.otp)}
              helperText={errors.otp}
              label=" OTP "
              name="otp"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.otp}
            /> */}
            <Text
              as="h5"
              style={{ fontWeight: "500" }}
              color="rgba(17, 17, 17, 0.8)"
              fontSize="14px"
            >
              OTP
            </Text>
            <OtpInput
              value={values.otp}
              onChange={(v) => setFieldValue("otp", v)}
              numInputs={6}
              containerStyle="otp-container"
              inputStyle="input-style"
            />
          </BoxStyle>
          <br />
          <Grid>
            <Grid item>
              {/* {authenticatePending ? (
                <CircularProgress size={20} />
              ) : ( */}
              {authenticateErrorMessage && (
                <Box textAlign="center" mb="1rem">
                  <Text fontSize="0.8rem" color="red.500">
                    {authenticateErrorMessage}
                  </Text>
                </Box>
              )}
              <Button
                variant="primary"
                width="100%"
                type="submit"
                height="55px"
                mt="20px"
                loading={authenticatePending}
              >
                CONTINUE
              </Button>
              {/* )} */}
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default OtpModal;
