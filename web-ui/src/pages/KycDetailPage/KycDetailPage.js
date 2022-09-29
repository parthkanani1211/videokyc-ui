import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

import { KYC_STATUSES, LOGIN_TYPE } from "store/constants/videoKyc";
import { Box, Flex, Text, Button, Grid, Loader, InputField } from "atoms";

import { AuditHeader } from "./AuditHeader";
import { AuditDetail } from "./AuditCardDetail";

const ButtonStyle = styled(Button)`
  @media only screen and (max-width: 600px) {
    div {
      font-size: 14px;
    }
  }
`;

const KycDetailPage = ({
  status,
  loginType,
  onRejectClick,
  onSubmitClick,
  DownloadError,
  submitLoading,
  onApproveClick,
  AuditDetailData,
  DownloadPending,
  AuditDetailPending,
  onDownloadRecordingClick,
}) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const onChangeHandler = useCallback((e) => {
    setError("");
    setComment(e.target.value);
  }, []);

  return (
    <div className="animated fadeIn">
      {AuditDetailPending && !AuditDetailData ? (
        <Flex alignItems="center" justifyContent="center" height="calc(100vh - 112px)">
          <Loader />
        </Flex>
      ) : (
        <Box>
          <Box
            bg="white"
            width="100%"
            borderRadius="10px"
            maxWidth="1335px"
            my="50px"
            mx="auto"
            p={{ xs: "20px", md: "36px" }}
          >
            <Flex
              height="100%"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              pb="30px"
            >
              <Text fontSize={{ xs: "16px", md: "24px" }} color="black" fontWeight="600">
                KYC Details
              </Text>
              {loginType !== LOGIN_TYPE.AGENT && (
                <>
                  {DownloadPending && <CircularProgress size={20} color="primary" />} &nbsp;
                  <ButtonStyle
                    variant="error"
                    width="fit-content"
                    px={{ md: "20px" }}
                    height="40px"
                    fontSize={{ xs: "13px", md: "16px" }}
                    disabled={DownloadPending}
                    onClick={onDownloadRecordingClick}
                  >
                    DOWNLOAD RECORDING
                  </ButtonStyle>
                  {DownloadError && (
                    <div className="">Recording not yet available. Please try again later.</div>
                  )}
                </>
              )}
            </Flex>

            <Box>
              <Box>
                <AuditHeader
                  agentDto={AuditDetailData?.agentDto}
                  location={AuditDetailData?.customerInfo?.location}
                  status={AuditDetailData?.status}
                  customerDto={AuditDetailData?.customerInfo?.customerDto}
                />
              </Box>
              <Grid gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gridGap="20px" pb="30px">
                <AuditDetail
                  loginType={loginType}
                  data={AuditDetailData?.kycTypeKYCVerificationDataMap}
                />
              </Grid>
              {AuditDetailData?.comment && (
                <Text>
                  <b>Comment:</b> {AuditDetailData?.comment}
                </Text>
              )}

              {(((loginType === LOGIN_TYPE.AGENT || loginType === LOGIN_TYPE.ADMIN) &&
                status === KYC_STATUSES.COMPLETED) ||
                ((loginType === LOGIN_TYPE.CHECKER || loginType === LOGIN_TYPE.ADMIN) &&
                  status === KYC_STATUSES.PENDING_APPROVAL)) && (
                <Grid
                  mt="30px"
                  mb="10px"
                  width="100%"
                  gridGap="10px"
                  alignItems="center"
                  gridTemplateColumns={{ md: "1fr auto" }}
                >
                  <Box mb={{ xs: "20px", md: "-0.5rem" }} css={{ input: { height: "40px" } }}>
                    <InputField
                      noMargin
                      error={error}
                      label="Comment"
                      value={comment}
                      onChange={onChangeHandler}
                    />
                  </Box>
                  <Flex>
                    <Button
                      px="20px"
                      mr="10px"
                      height="40px"
                      variant="error"
                      width="fit-content"
                      onClick={() => {
                        if (comment) {
                          onRejectClick(comment);
                        } else {
                          setError("Comment is required for Rejection");
                        }
                      }}
                    >
                      Reject
                    </Button>
                    {(loginType === LOGIN_TYPE.AGENT || loginType === LOGIN_TYPE.ADMIN) &&
                      status === KYC_STATUSES.COMPLETED && (
                        <Button
                          px="20px"
                          height="40px"
                          type="button"
                          variant="primary"
                          width="fit-content"
                          onClick={() => onSubmitClick(comment)}
                        >
                          Submit
                        </Button>
                      )}
                    {(loginType === LOGIN_TYPE.CHECKER || loginType === LOGIN_TYPE.ADMIN) &&
                      status === KYC_STATUSES.PENDING_APPROVAL && (
                        <Button
                          px="20px"
                          height="40px"
                          variant="primary"
                          width="fit-content"
                          onClick={() => onApproveClick(comment)}
                        >
                          Approve
                        </Button>
                      )}
                  </Flex>
                </Grid>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default KycDetailPage;
