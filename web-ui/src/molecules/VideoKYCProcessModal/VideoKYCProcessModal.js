import React, { useEffect } from "react";
import Modal from "react-modal";
import { Box, Grid, Flex, Text, Button } from "atoms";
import { useHistory } from "react-router-dom";

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

const cardData = [
  {
    name: "Pan card",
    bg: "#B9F1CF",
    borderColor: "#4BC177",
    iconSrc: "../../assets/img/pancard.svg",
    alt: "Pan card",
  },
  {
    name: "Adhaar card",
    bg: "#D7E4FF",
    borderColor: "#97B8FB",
    iconSrc: "../../assets/img/pancard.svg",
    alt: "Adhaar card",
  },
  {
    name: "Blank paper and pen ",
    bg: "#FFE3BA",
    borderColor: "#F7C479",
    iconSrc: "../../assets/img/pancard.svg",
    alt: "Blank paper and pen ",
  },
];

const KycCard = ({ borderColor, bg, name, alt }) => {
  return (
    <Grid
      bg={bg}
      p="8px"
      mt="10px"
      mr="10px"
      width="150px"
      height="54px"
      gridGap="10px"
      border="1px solid"
      borderRadius="4px"
      alignItems="center"
      gridAutoFlow="column"
      borderColor={borderColor}
      justifyContent="flex-start"
    >
      <Flex
        bg="white"
        width="36px"
        height="36px"
        alignItems="center"
        borderRadius="30px"
        justifyContent="center"
      >
        <img src={require("../../assets/img/pancard.svg")} width={20} height={20} alt={alt} />
      </Flex>
      <Text as="h3" fontWeight="400" fontSize="14px" color="black" my={0}>
        {name}
      </Text>
    </Grid>
  );
};

export const VideoKYCProcessModal = ({
  isOpen,
  onBackClick,
  onStartNewVideoKycClick,
  pendingState,
  requestSingleData,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (requestSingleData) {
      history.push(`/videoKyc/start-kyc/${requestSingleData.sessionName}`);
    }
  }, [requestSingleData, history]);
  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <Box>
        <Box
          bg="blue.900"
          borderTopLeftRadius="4px"
          borderTopRightRadius="4px"
          p={{ xs: "20px", md: "26px 36px" }}
        >
          <Text as="h3" fontWeight="500" fontSize={{ xs: "18px", md: "24px" }} color="white" my={0}>
            Welcome to Video-KYC process
          </Text>
        </Box>
        <Box
          overflow="hidden auto"
          maxHeight="calc(100vh - 330px)"
          p={{ xs: "10px 20px 30px", md: "26px 36px" }}
        >
          <Text as="h4" fontWeight="600" fontSize="18px" color="darkgrey.900" py="20px">
            Please follow the below instructions:
          </Text>

          <Text
            as="h6"
            fontWeight="400"
            fontSize="14px"
            color="rgba(17, 17, 17, 0.8)"
            lineHeight="30px"
          >
            Please do not move away from this browser or open another app till you get connected to
            our Banking Agent.
          </Text>
          <Text
            as="h6"
            fontWeight="400"
            fontSize="14px"
            color="rgba(17, 17, 17, 0.8)"
            lineHeight="30px"
          >
            Please ensure you are in a good network spot or connected to a stable internet
            connection.
          </Text>
          <Text
            as="h6"
            fontWeight="400"
            fontSize="14px"
            color="rgba(17, 17, 17, 0.8)"
            lineHeight="30px"
          >
            In case all our Agents are busy, you might have to wait for a few mins.
          </Text>
          <Text
            as="h6"
            fontWeight="400"
            fontSize="14px"
            color="rgba(17, 17, 17, 0.8)"
            lineHeight="30px"
          >
            Once you are connected to our Banking Agent, you will receive a Video Call Invitation.
          </Text>
          <Text
            as="h6"
            fontWeight="400"
            fontSize="14px"
            color="rgba(17, 17, 17, 0.8)"
            lineHeight="30px"
          >
            Please keep original documents along with you to complete process on time.
          </Text>
          <Flex
            flexWrap="wrap"
            justifyContent="flex-start"
            mt={{ xs: "20px", md: "43px" }}
            fontSize={{ xs: "12px", md: "initial" }}
          >
            {cardData.map((item, index) => {
              return (
                <KycCard
                  key={index}
                  bg={item.bg}
                  alt={item.alt}
                  name={item.name}
                  iconSrc={item.iconSrc}
                  borderColor={item.borderColor}
                />
              );
            })}
          </Flex>
        </Box>

        <Flex
          p="26px 36px"
          bg="lightgrey.300"
          borderBottomLeftRadius="4px"
          borderBottomRightRadius="4px"
          justifyContent={{ xs: "center", md: "flex-start" }}
        >
          <Button
            px="30px"
            height="40px"
            variant="default"
            width="fit-content"
            onClick={onBackClick}
          >
            BACK
          </Button>
          <Button
            ml="20px"
            width="130px"
            height="40px"
            variant="primary"
            loading={pendingState}
            disabled={pendingState}
            onClick={onStartNewVideoKycClick}
          >
            PROCEED
          </Button>
        </Flex>
      </Box>
    </Modal>
  );
};
