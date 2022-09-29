import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { AppSidebarToggler } from "@coreui/reactV2";
import { Link, useLocation } from "react-router-dom";

import { getLogo } from "util/image";
import { LOGIN_TYPE } from "store/constants/videoKyc";

import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Tooltip,
  Nav,
  // NavItem,
} from "reactstrap";
import { Box, Flex, Text } from "atoms";

import { viewProfile } from "pages/Profile/ProfileService";
import { useLocationQueryValue } from "hooks/useLocationQuery";

const BoxStyle = styled(Box)`
  .dropdown-menu-right {
    top: 15px !important;
  }
  .dropdown-menu {
    border: none;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
  }
  .dropdown-item {
    border-bottom: none !important;
    padding: 0;
    & > * {
      padding: 10px 20px;
    }
  }
`;
function DefaultHeader(props) {
  const {
    onLogoutClick,
    handleUserProfile,
    authAuthenticationData,
    authAuthenticationType,
    authAuthenticationUsername,
    authAuthenticationMobileNumber,
    requestListData,
  } = props;

  const { pathname } = useLocation();

  const isDetailsForm = useMemo(() => pathname === "/videoKyc/customer-details", [pathname]);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const refUrl = useLocationQueryValue("ref");

  const status = useMemo(() => requestListData?.[0]?.videoKYCRequestStatus, [requestListData]);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    viewProfile()
      .then((res) => setProfileData(res))
      .catch((err) => console.error(err));
  }, [pathname]);

  // console.log("profileData", profileData);
  return (
    <React.Fragment>
      <AppSidebarToggler
        className="d-lg-none"
        display="md"
        mobile
        hidden={authAuthenticationData}
      />
      <Box ml={{ xs: "12px", md: "40px" }}>
        <Link
          to={
            authAuthenticationType !== LOGIN_TYPE.CUSTOMER || (!refUrl && isDetailsForm)
              ? "/"
              : "/videoKyc/Customer"
          }
        >
          <Box as="img" src={getLogo()} maxWidth="160" height="48" alt="Obvious Logo" />
        </Link>
      </Box>
      <AppSidebarToggler className="d-md-down-none" display="lg" hidden={authAuthenticationData} />
      {/* {authAuthenticationType === 'Agent' && (
                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3">
                        <NavLink to="/videoKyc/agent" className="nav-link" >Video KYC</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <Link to="/audit-report" className="nav-link">Audit Report</Link>
                    </NavItem>
                </Nav>
            )} */}
      <BoxStyle mr={{ xs: "20px", md: "30px" }}>
        {authAuthenticationData && (
          <Nav className="ml-auto" navbar>
            <Box fontWeight="100" textAlign="right" display={{ xs: "none", md: "initial" }}>
              <Text as="h5" style={{ fontWeight: "500" }} fontSize="14px" mt="10px">
                {/* {authAuthenticationUsername} */}
                {profileData?.customerName?.firstName ? (
                  <>
                    {profileData?.customerName?.firstName}
                    {profileData?.customerName?.lastName
                      ? " " + profileData?.customerName?.lastName
                      : ""}
                  </>
                ) : (
                  authAuthenticationUsername
                )}
                {authAuthenticationType ? " (" + authAuthenticationType + ")" : ""}
              </Text>
              <Text
                as="h5"
                style={{ fontWeight: "400" }}
                fontSize="14px"
                color="rgba(17, 17, 17, 0.8)"
              >
                {authAuthenticationMobileNumber ? `Mobile: ${authAuthenticationMobileNumber}` : ""}
              </Text>
            </Box>
            <UncontrolledDropdown nav direction="down">
              <DropdownToggle nav>
                {/* <img
                  src={"../../assets/img/avatars/6.jpg"}
                  className="img-avatar"
                  alt="admin@bootstrapmaster.com"
                /> */}
                <Flex alignItems="center">
                  <Flex
                    width="46px"
                    bg="blue.500"
                    height="46px"
                    alignItems="center"
                    borderRadius="40px"
                    justifyContent="center"
                    ml="10px"
                  >
                    <Text
                      lineHeight="12px"
                      textTransform="uppercase"
                      fontSize="20px"
                      fontFamily='"Poppins", "sans-serif"'
                      color="white"
                    >
                      {profileData?.customerName
                        ? profileData?.customerName?.firstName?.charAt(0)
                        : authAuthenticationUsername?.charAt(0)}
                      {profileData?.customerName
                        ? profileData?.customerName?.lastName?.charAt(0)
                        : authAuthenticationUsername?.split(" ")?.[1]?.charAt(0)}
                    </Text>
                  </Flex>
                  <Box pl="5px" fontSize="20px" color="gray.400" my={0}>
                    &#9662;
                  </Box>
                </Flex>
              </DropdownToggle>
              <DropdownMenu right>
                {authAuthenticationType === LOGIN_TYPE.CUSTOMER ? (
                  <DropdownItem id="Tooltip" onClick={() => setTooltipOpen(false)}>
                    {
                      // status &&
                      // (status === KYC_STATUSES.COMPLETED ||
                      //   status === KYC_STATUSES.APPROVED)
                      !isDetailsForm ? (
                        <Link
                          to="/profile"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                            display: "block",
                          }}
                        >
                          View Profile
                        </Link>
                      ) : (
                        <>
                          <div style={{ color: "#ccc" }}>View Profile</div>
                          <Tooltip
                            placement="left"
                            isOpen={tooltipOpen}
                            target="Tooltip"
                            toggle={toggle}
                          >
                            Please complete the KYC Process First!
                          </Tooltip>
                        </>
                      )
                    }
                  </DropdownItem>
                ) : null}
                {authAuthenticationType === LOGIN_TYPE.ADMIN ? (
                  <>
                    <DropdownItem>
                      <Link
                        to="/admin/requests"
                        style={{
                          textDecoration: "none",
                          color: "black",
                          width: "100%",
                          display: "block",
                        }}
                      >
                        Requests
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link
                        to="/admin/users"
                        style={{
                          textDecoration: "none",
                          color: "black",
                          width: "100%",
                          display: "block",
                        }}
                      >
                        User Management
                      </Link>
                    </DropdownItem>
                  </>
                ) : null}
                <DropdownItem onClick={onLogoutClick} style={{ color: "rgba(251, 0, 0, 1)" }}>
                  <div>Logout</div>
                  {/* <Text
                    lineHeight="12px"
                    textTransform="uppercase"
                    fontSize="20px"
                    fontFamily='"Poppins", "sans-serif"'
                    color="white"
                  >
                    {" "}
                  </Text> */}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        )}
      </BoxStyle>
    </React.Fragment>
  );
}

export default DefaultHeader;

DefaultHeader.prototype = {
  children: PropTypes.node,
};
