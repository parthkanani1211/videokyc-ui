import React from "react";

import { KYC_STATUSES_LABEL } from "store/constants/videoKyc";
import { Flex, Grid, InfoHeader, KycDetailCard, Text } from "atoms";
import Request from "store/request/helper";

export const AuditHeader = ({ customerDto, agentDto, status, location }) => {
  return (
    <>
      <Grid gridTemplateColumns={{ xs: "1fr", md: "1fr 3fr 2fr" }} gridGap="20px" pb="30px">
        <KycDetailCard>
          <Flex justifyContent="space-between" flexDirection={{ xs: "row", md: "column" }}>
            <InfoHeader heading="Request ID" detail={agentDto?.employeeId} />
            <Grid>
              <InfoHeader heading="Status" detail="" />
              <Flex
                alignItems="center"
                bg={Request.getBadge(status)}
                borderRadius="4px"
                p="5px 10px"
                width="fit-content"
                height="30px"
              >
                <Text fontSize="14px" color="white" fontWeight="400" whiteSpace="nowrap">
                  {KYC_STATUSES_LABEL[status]}
                </Text>
              </Flex>
            </Grid>
          </Flex>
        </KycDetailCard>
        <KycDetailCard>
          <Grid gridTemplateColumns={{ xs: "1fr", md: "1fr 1.4fr" }} gridGap="20px">
            <InfoHeader
              heading="Customer Name"
              detail={customerDto && `${customerDto?.firstName} ${customerDto?.lastName}`}
            />
            <InfoHeader heading="Location" detail={location} />
          </Grid>
          <InfoHeader heading="Mobile Number" detail={customerDto?.mobileNumber} />
        </KycDetailCard>
        <KycDetailCard>
          <InfoHeader
            heading="Maker Name"
            detail={agentDto && `${agentDto?.firstName} ${agentDto?.lastName}`}
          />
          <InfoHeader heading="Mobile Number" detail={agentDto?.mobileNumber} />
        </KycDetailCard>
      </Grid>
    </>
  );
};
