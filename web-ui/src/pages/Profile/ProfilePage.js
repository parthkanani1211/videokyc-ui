import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  COMMUNITY,
  CONSTITUTION,
  MARITAL_STATUS,
  OCCUPATION,
  RESIDENCY_STATUS,
} from "store/constants/roles";
import { withAuthStore } from "store/auth";
import { Box, Flex, Grid, Loader, Text } from "atoms";
import { selectHideUserDetails } from "store/selectors/session";

import { viewProfile } from "./ProfileService";

const PersonalInfoHeader = ({ heading, detail }) => {
  return (
    <Box>
      <Text
        fontSize="14px"
        fontFamily='"Poppins", "sans-serif"'
        color="rgba(17, 17, 17, 0.6)"
        fontWeight="500"
      >
        {heading}
        <Box as="span" display={{ xs: "none", md: "initial" }}>
          :
        </Box>
      </Text>
      <Text fontSize="16px" fontFamily='"Poppins", "sans-serif"' color="black" mt="5px">
        {detail}
      </Text>
    </Box>
  );
};

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    viewProfile()
      .then((res) => setProfileData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Flex
      height="100%"
      width="100%"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      fontSize="18px"
    >
      {!profileData ? (
        <Loader loading={!profileData} />
      ) : (
        <>
          <Box my="50px" bg="white" width="100%" borderRadius="1rem" maxWidth="1335px">
            <Grid gridTemplateColumns={{ xs: "1fr", md: "1fr 3.5fr" }} maxWidth="100%">
              <Grid
                px="30px"
                borderRight={{ md: "1px solid" }}
                borderBottom={{ xs: "1px solid", md: "0px" }}
                borderColor="rgba(17, 17, 17, 0.1) !important"
                py={{ xs: "14px", md: "40px" }}
                gridAutoFlow={{ xs: "column", md: "row" }}
                alignContent="flex-start"
                alignItems={{ xs: "center", md: "initial" }}
                justifyContent={{ xs: "flex-start", md: "center" }}
                justifyItems={{ xs: "flex-start", md: "center" }}
              >
                <Flex
                  width={{ xs: "112px", md: "160px" }}
                  height={{ xs: "112px", md: "160px" }}
                  alignItems="center"
                  borderRadius="160px"
                  justifyContent="center"
                  bg="rgba(0, 108, 251, 0.2)"
                  mr={{ xs: "25px", md: "0px" }}
                >
                  <Flex
                    width={{ xs: "100px", md: "150px" }}
                    bg="blue.500"
                    height={{ xs: "100px", md: "150px" }}
                    alignItems="center"
                    borderRadius="150px"
                    justifyContent="center"
                  >
                    <Text
                      lineHeight="12px"
                      textTransform="uppercase"
                      fontSize="60px"
                      fontFamily='"Poppins", "sans-serif"'
                      color="white"
                    >
                      {profileData.customerName?.firstName?.charAt(0)}
                      {profileData.customerName?.lastName?.charAt(0)}
                    </Text>
                  </Flex>
                </Flex>
                {/* <Flex justifyContent="center">
                  <img
                    src={`https://cdn.landesa.org/wp-content/uploads/default-user-image.png`}
                    alt="user-profile"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: 120 / 2,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                </Flex> */}
                <Text
                  textTransform="uppercase"
                  fontSize={{ xs: "16px", md: "20px" }}
                  fontFamily='"Poppins", "sans-serif"'
                  color="black"
                  textAlign="center"
                  display="flex"
                  flexWrap="wrap"
                  lineHeight="20px"
                  mt={{ md: "2rem" }}
                  wordBreak="break-word"
                  justifyContent={{ md: "center" }}
                >
                  <Box mx="2px">{profileData.customerName.prefix}</Box>
                  <Box mx="2px">{profileData.customerName.firstName}</Box>
                  <Box mx="2px">{profileData.customerName.middleName}</Box>
                  <Box mx="2px">{profileData.customerName.lastName}</Box>
                </Text>
              </Grid>
              <Box pl={{ xs: "27px", md: "50px" }} pr={{ xs: "16px", md: "50px" }} py="40px">
                <Flex justifyContent="space-between">
                  <Text
                    textTransform="uppercase"
                    fontSize={{ xs: "18px", md: "24px" }}
                    fontFamily='"Poppins", "sans-serif"'
                    color="black"
                    fontWeight="600"
                  >
                    Personal Information
                  </Text>
                  <Link to="/videoKyc/customer-details?ref=profile">
                    <Box bg="blue.500" p="6px 12px" borderRadius="4px">
                      <Flex alignItems="center">
                        <img
                          src={`../../assets/img/edit.svg`}
                          alt="edit profile"
                          style={{
                            width: "15px",
                            height: "15px",
                          }}
                        />{" "}
                        <Text fontSize="14px" color="white" pl="8px">
                          Edit
                          <Box as="span" display={{ xs: "none", md: "initial" }}>
                            &nbsp;Profile
                          </Box>
                        </Text>
                      </Flex>
                    </Box>
                  </Link>
                </Flex>

                <Box
                  display="grid"
                  gridColumnGap="20px"
                  my={{ xs: "30px", md: "60px" }}
                  gridRowGap={{ xs: "40px", md: "60px" }}
                  gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1fr" }}
                >
                  {profileData?.husbandName ? (
                    <PersonalInfoHeader
                      heading="Husband's Name"
                      detail={
                        profileData.husbandName?.firstName ||
                        profileData.husbandName?.middleName ||
                        profileData.husbandName?.lastName
                          ? `${
                              profileData.husbandName?.prefix
                                ? profileData.husbandName?.prefix + " "
                                : ""
                            }${profileData.husbandName?.firstName || ""} 
                          ${profileData.husbandName?.middleName || ""} ${
                              profileData.husbandName?.lastName || ""
                            }`
                          : "NA"
                      }
                    />
                  ) : (
                    <PersonalInfoHeader
                      heading="Father's Name"
                      detail={
                        profileData.fatherName?.firstName ||
                        profileData.fatherName?.middleName ||
                        profileData.fatherName?.lastName
                          ? `${
                              profileData.fatherName?.prefix
                                ? profileData.fatherName?.prefix + " "
                                : ""
                            }${profileData.fatherName?.firstName || ""} 
                            ${profileData.fatherName?.middleName || ""} ${
                              profileData.fatherName?.lastName || ""
                            }`
                          : "NA"
                      }
                    />
                  )}
                  <PersonalInfoHeader
                    heading="Mother's Name"
                    detail={
                      profileData.motherName?.firstName ||
                      profileData.motherName?.middleName ||
                      profileData.motherName?.lastName
                        ? `${
                            profileData.motherName?.prefix
                              ? profileData.motherName?.prefix + " "
                              : ""
                          } ${profileData.motherName?.firstName || ""} 
                              ${profileData.motherName?.middleName || ""} ${
                            profileData.motherName?.lastName || ""
                          }`
                        : "NA"
                    }
                  />
                  {/* <PersonalInfoHeader heading="Account Type" detail={profileData.accountType} /> */}
                  <PersonalInfoHeader
                    heading="Marital Status"
                    detail={MARITAL_STATUS.find((m) => m.value === profileData.maritalStatus).label}
                  />
                  <PersonalInfoHeader
                    heading="Occupation"
                    detail={OCCUPATION.find((o) => o.value === profileData.occupation).label}
                  />
                  <PersonalInfoHeader
                    heading=" Community"
                    detail={COMMUNITY.find((c) => c.value === profileData.community)?.label}
                  />
                  <PersonalInfoHeader
                    heading=" Residency Status"
                    detail={RESIDENCY_STATUS.find((r) => r.value === profileData.residency)?.label}
                  />
                  <PersonalInfoHeader
                    heading="Constitution"
                    detail={
                      CONSTITUTION.find((c) => c.value?.toString() === profileData.constitution)
                        ?.label
                    }
                  />
                  <Box gridColumn={{ md: "span 2", xm: "initial" }}>
                    <PersonalInfoHeader
                      heading="Address"
                      detail={
                        profileData?.address?.streetAddress
                          ? `${profileData?.address?.streetAddress}, ${profileData?.address?.area}, ${profileData?.address?.city}, ${profileData?.address?.state}, ${profileData?.address?.county} - ${profileData?.address?.pincode}`
                          : "NOT DEFINED"
                      }
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Box>
        </>
      )}
    </Flex>
  );
}

const mapState = (state, { authSelectors }) => ({
  authAuthenticationData: authSelectors.getAuthAuthenticationData(state),
  authAuthenticationType: authSelectors.getAuthAuthenticationType(state),
  authAuthenticationToken: authSelectors.getAuthAuthenticationToken(state),
  authAuthenticationUsername: authSelectors.getAuthAuthenticationUsername(state),
  authAuthenticationMobileNumber: authSelectors.getAuthAuthenticationMobileNumber(state),
  hideUserDetails: selectHideUserDetails(state),
});

const enhance = compose(withAuthStore, connect(mapState));

export default enhance(ProfilePage);
