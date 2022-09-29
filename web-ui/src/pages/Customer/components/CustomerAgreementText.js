import React from "react";

import { Box } from "atoms";
import styled from "styled-components";

const BoxStyle = styled(Box)`
  @media only screen and (max-width: 600px) {
    li {
      font-size: 13px;
      word-break: break-word;
    }
  }
`;

export default function CustomerAgreementText() {
  return (
    <BoxStyle>
      <Box
        as="ol"
        mt="20px"
        css={{
          "& > li": {
            marginBottom: "10px",
            textAlign: "justify",
          },
        }}
        width={{ xs: "100%", md: "calc(100% - 100px)" }}
        ml={{ xs: "-20px", md: "unset" }}
      >
        <Box as="li">
          I voluntarily opt for Aadhaar OVD KYC and submit to the Bank my Aadhaar number, Virtual
          ID, e-Aadhaar, XML, Masked Aadhaar, Aadhaar details, demographic information, identity
          information, Aadhaar registered mobile number, face authentication details and/or
          biometric information (collectively, “Information”).
        </Box>
        <Box as="li">
          I am informed by the Bank, that: For Video-KYC/authentication/offline verification, Bank
          will share PAN and Aadhaar number and/or biometrics with CIDR/UIDAI, and CIDR/UIDAI will
          share with Bank, authentication data, Aadhaar data, demographic details, registered mobile
          number, identity information, which shall be used for the informed purposes mentioned in 3
          below.
        </Box>
        <Box as="li">
          I authorise and give my consent to the Bank (and its service providers), for following
          informed purposes:{" "}
          <Box as="ol" type="i" ml={{ xs: "-20px", md: "unset" }}>
            <Box as="li">
              KYC and periodic KYC process as per the PML Act, 2002 and rules thereunder and RBI
              guidelines, or for establishing my identity, carrying out my identification, offline
              verification or Video-KYC or Yes/No authentication, demographic or other
              authentication/verification/identification as may be permitted as per applicable law,
              for all accounts, facilities, services and relationships of/through the Bank, existing
              and future.
            </Box>
            <Box as="li">
              Collecting, sharing, storing, preserving Information, maintaining records and using
              the Information and authentication/verification/identification records:
              <ol type="a">
                <Box as="li">for the informed purposes above,</Box>
                <Box as="li">as well as for regulatory and legal reporting and filings and/or</Box>
                <Box as="li">where required under applicable law;</Box>
              </ol>
            </Box>
            <Box as="li">
              Producing records and logs of the consent, Information or of authentication,
              identification, verification etc. for evidentiary purposes including before a court of
              law, any authority or in arbitration.
            </Box>
          </Box>
        </Box>
        <Box as="li">
          I understand that the PAN number, Aadhaar number and core biometrics will not be stored/
          shared except as per law and for CIDR submission.
        </Box>
        <Box as="li">
          The above consent &amp; purpose of collecting information will be shared as an instruction
          to me before and during the Video KYC session
        </Box>
      </Box>
    </BoxStyle>
  );
}
