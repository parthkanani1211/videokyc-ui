import React from "react";

import Modal from "react-modal";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

import { Box, Text, Button, Flex } from "atoms";

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
    maxWidth: "530px",
    overflow: "initial",
    boxShadow: "none",
  },
  overlay: {
    zIndex: 30,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

export const DeleteUserModal = ({ isOpen, onClose, onConfirm, loading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} onRequestClose={onClose} style={customStyles}>
      <Box pt="40px">
        <Player
          autoplay
          loop
          src="https://assets8.lottiefiles.com/packages/lf20_d6r9tuqy.json"
          style={{ width: 240, height: 180 }}
        >
          <Controls visible={false} />
        </Player>
        <Box p="15px 36px">
          <Text
            as="h4"
            fontWeight="600"
            fontSize="18px"
            color="darkgrey.900"
            py="20px"
            textAlign="center"
          >
            Are you sure you want to delete?
          </Text>
        </Box>
        <Flex
          p="26px 36px"
          bg="lightgrey.300"
          justifyContent="center"
          borderBottomLeftRadius="4px"
          borderBottomRightRadius="4px"
        >
          <Button px="30px" height="40px" variant="default" onClick={onClose} width="fit-content">
            CANCEL
          </Button>
          <Button
            variant="error"
            height="40px"
            onClick={onConfirm}
            width="150px"
            ml="10px"
            loading={loading}
          >
            DELETE
          </Button>
        </Flex>
      </Box>
    </Modal>
  );
};
