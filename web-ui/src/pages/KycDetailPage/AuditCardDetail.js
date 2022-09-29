import React, { useState } from "react";
import ImageIcon from "@material-ui/icons/Image";

import { Box, Text, Grid, KycDetailCard } from "atoms";

import { KYC_DOCUMENT_LIST } from "store/constants/videoKyc";

export const AuditDetail = ({ loginType, data }) => {
  const [isEnlargeImage, setEnlargeImage] = useState("");
  return KYC_DOCUMENT_LIST.map((kycListItem) => {
    if (data?.[kycListItem.type]) {
      const kycData = data[kycListItem.type];
      return (
        <Box>
          <KycDetailCard>
            <Grid>
              <Text fontSize={{ xs: "18px", md: "24px" }} color="black" fontWeight="600">
                {kycListItem.label}
              </Text>
              <Box>
                {kycData.matchResults.map((itemsprop) => (
                  <Grid
                    gridTemplateColumns="1fr 1.5fr"
                    gridGap="20px"
                    key={itemsprop.id}
                    borderBottom="1px solid"
                    borderColor="rgba(0, 0, 0, 0.1)"
                    justifyContent="space-between"
                    p="10px"
                  >
                    <Text fontSize="14px" color="rgba(17, 17, 17, 0.6)" fontWeight="500">
                      {itemsprop.name}
                    </Text>
                    <Text
                      fontSize="14px"
                      color="rgba(17, 17, 17, 1)"
                      fontWeight="500"
                      textAlign="right"
                    >
                      {itemsprop.value}
                    </Text>
                  </Grid>
                ))}
              </Box>
            </Grid>
            <Grid
              gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
              gridGap="20px"
              justifyContent="space-between"
            >
              {kycData.imageList?.length !== 0 ? (
                kycData.imageList.map((itemimages) => (
                  <Box
                    borderRadius="10px"
                    overflow="hidden"
                    _hover={{
                      "& > div": {
                        opacity: 1,
                      },
                    }}
                    onClick={() =>
                      itemimages.imageData &&
                      setEnlargeImage(`data:image;base64,${itemimages.imageData}`)
                    }
                  >
                    <img
                      alt={kycListItem.type}
                      src={itemimages.imageData && `data:image;base64,${itemimages.imageData}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }}
                    />
                    <Box
                      top="0"
                      left="0"
                      right="0"
                      opacity={0}
                      bottom="5px"
                      display="flex"
                      cursor="pointer"
                      alignItems="center"
                      position="absolute"
                      borderRadius="10px"
                      bg="rgba(0,0,0,0.3)"
                      transition="0.3s all"
                      justifyContent="center"
                    >
                      <Box
                        p="7px 20px"
                        color="white"
                        borderRadius="4px"
                        border="1px solid"
                        borderColor="white"
                        bg="rgba(0,0,0,0.3)"
                      >
                        Enlarge
                      </Box>
                    </Box>
                  </Box>
                ))
              ) : (
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <ImageIcon />
                  No image Found!
                </div>
              )}
            </Grid>
          </KycDetailCard>
          {isEnlargeImage && (
            <Box
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
              <Box>
                <Box as="img" src={isEnlargeImage} maxWidth="100vw" maxHeight="85vh" />
                <Box
                  position="absolute"
                  right="15px"
                  top="0px"
                  fontSize="50px"
                  color="red.500"
                  cursor="pointer"
                  onClick={() => setEnlargeImage("")}
                >
                  &times;
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      );
    } else {
      return (
        <KycDetailCard>
          <Text fontSize={{ xs: "18px", md: "24px" }} color="black" fontWeight="600">
            {kycListItem.label} {loginType}
          </Text>
          <Box>
            <Text fontSize="14px" color="rgba(17, 17, 17, 0.6)" fontWeight="500">
              No Data Found !
            </Text>
          </Box>
        </KycDetailCard>
      );
    }
  });
};
