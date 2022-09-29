import React from "react";
import Modal from "react-modal";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

import { Box, Flex, Text, Button } from "atoms";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: 0,
    borderRadius: "4px",
    padding: 0,
    width: "100%",
    maxWidth: "750px",
    overflow: "initial",
    boxShadow: "none",
  },
  overlay: {
    zIndex: 30,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

export const WaitingForAgentModal = ({ isOpen, onClick, time }) => {
  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <Flex justifyContent="center">
        <Box p="26px 36px">
          <Box textAlign="center" height={{ md: "180px" }}>
            <Player
              autoplay
              loop
              src="https://assets2.lottiefiles.com/packages/lf20_iv0UOb.json"
              style={{ width: 240, height: 180 }}
            >
              <Controls visible={false} />
            </Player>
          </Box>
          <Text
            as="h4"
            fontWeight="600"
            fontSize="24px"
            color="darkgrey.900"
            py="10px"
            textAlign="center"
          >
            Waiting for agent to connect...
          </Text>

          <Text
            as="h4"
            fontWeight="500"
            fontSize="16px"
            color="rgba(17, 17, 17, 0.8)"
            pt="10px"
            textAlign="center"
          >
            Session will expire after:{"  "}
          </Text>
          <Text as="h1" fontWeight="600" fontSize="26px" color="blue.500" textAlign="center">
            {time}
          </Text>
        </Box>
      </Flex>
      <Flex
        bg="lightgrey.300"
        p="26px 36px"
        borderBottomLeftRadius="4px"
        borderBottomRightRadius="4px"
      >
        <Button
          variant="warning"
          width="fit-content"
          px="30px"
          height="40px"
          onClick={onClick}
          m="auto"
        >
          CANCEL
        </Button>
      </Flex>

      {/* <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100%" }}
      >
        <Grid item xs={12}>
          <Box padding="20px">
            <Typography variant="h4" component="p" gutterBottom color="primary">
              Waiting for agent to connect...
              <CircularProgress size={30} />
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
              Session will expire after:{"  "}
              <Typography variant="h5" component="span">
                {moment.utc(waitSessionTime * 1000).format("mm:ss")}
              </Typography>
            </Typography>
            <Box padding="10px 0">
              <Divider />
            </Box>
            <Box display="flex" justifyContent="center">
              <CButton onClick={() => this.leaveSession(true, true)} color="warning">
                Cancel
              </CButton>
            </Box>
          </Box>
        </Grid>
      </Grid> */}
    </Modal>
  );
};
