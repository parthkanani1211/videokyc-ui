import React from "react";
import Modal from "react-modal";
import { Form, Formik } from "formik";
import { Radio } from "@material-ui/core";

import { Box, Text, Button, Grid, Flex } from "atoms";
import { BoxStyle } from "pages/VideoKycLogin/Components/OtpModal";

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

export const LeaveConfirmModal = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} style={customStyles} onRequestClose={onClose}>
      <Box>
        <Box bg="blue.900" p="26px 36px" borderTopLeftRadius="4px" borderTopRightRadius="4px">
          <Text as="h3" fontWeight="500" fontSize="24px" color="white" my={0}>
            Leave Session
          </Text>
        </Box>
        <Box p="20px 36px 40px">
          <Text as="h4" fontWeight="600" fontSize="18px" color="darkgrey.900" py="20px">
            Reason for not completing Video Kyc
          </Text>

          <Formik
            initialValues={{
              reason: 0,
            }}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <BoxStyle>
                  <Flex alignItems="center" as="label" cursor="pointer">
                    <Radio
                      value={0}
                      name="reason"
                      color="primary"
                      checked={values.reason === 0}
                      onClick={() => setFieldValue("reason", 0)}
                    />
                    <Text>
                      Leave the session for now and perform the pending steps in later session.
                    </Text>
                  </Flex>

                  <Flex alignItems="center" as="label" cursor="pointer">
                    <Radio
                      value={1}
                      name="reason"
                      color="primary"
                      checked={values.reason === 1}
                      onClick={() => setFieldValue("reason", 1)}
                    />
                    <Text>Cancel the Video KYC request permanently.</Text>
                  </Flex>
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
                    >
                      Leave
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
