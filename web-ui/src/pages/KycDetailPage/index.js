import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { bindActionCreators } from "redux";
import { getAuditDetail } from "../../store/actions/audits";
import { downloadRecording } from "../../store/actions/videoKyc";
import { withRequestStore } from "../../store/request";
import { withAuthStore } from "../../store/auth";
import { ACTIONS } from "../../store/request/constants";
import KycDetailPage from "./KycDetailPage";
import { KYC_STATUSES } from "store/constants/videoKyc";
import { useHistory } from "react-router-dom";

let tempStatus = "";
const KycDetailPageContainer = (props) => {
  const {
    match,
    actions,
    // requestPending,
    AuditDetailPending,
    AuditDetailData,
    AuditDetailerror,
    requestActions,
    downloadPending,
    downloadError,
  } = props;
  const { id } = match.params;
  // const [status, setStatus] = useState(AuditDetailData?.status || "");
  const [status, setStatus] = useState("COMPLETED");

  const history = useHistory();

  useEffect(() => {
    setStatus(AuditDetailData?.status);
  }, [AuditDetailData]);

  // useEffect(() => {
  //   if (!requestPending && tempStatus) {
  //     setStatus(tempStatus);
  //     tempStatus = "";
  //   }
  // }, [requestPending]);

  // console.log(requestPending);

  useEffect(() => {
    actions.getAuditDetail(id);
  }, [id, actions]);

  const handleApproveClick = (comment) => {
    requestActions.update(id, {
      action: ACTIONS.APPROVE,
      comment,
    });
    tempStatus = KYC_STATUSES.APPROVED;
    history.push("/");
  };

  const handleRejectClick = async (comment) => {
    await requestActions.update(id, {
      action: ACTIONS.REJECT,
      comment,
    });
    tempStatus = KYC_STATUSES.REJECTED;
    history.push("/");
  };

  const handleSubmitClick = async (comment) => {
    await requestActions.update(id, {
      action: ACTIONS.SUBMIT,
      comment,
    });
    tempStatus = KYC_STATUSES.PENDING_APPROVAL;
    history.push("/");
  };

  function downloadRecordingCallback(blob) {
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = `recording-request-${1}.mp4`;
    a.click();
  }

  const handleDownloadRecording = () => {
    actions.downloadRecording(id, downloadRecordingCallback);
  };

  return (
    <KycDetailPage
      status={status}
      AuditDetailPending={AuditDetailPending}
      AuditDetailData={AuditDetailData}
      AuditDetailerror={AuditDetailerror}
      onApproveClick={handleApproveClick}
      onRejectClick={handleRejectClick}
      onSubmitClick={handleSubmitClick}
      onDownloadRecordingClick={handleDownloadRecording}
      DownloadPending={downloadPending}
      DownloadError={downloadError}
      {...props}
    />
  );
};

const mapState = (state, props) => {
  return {
    AuditDetailPending: state.audits.AuditDetailPending,
    AuditDetailData: state.audits.AuditDetailData,
    AuditDetailerror: state.audits.AuditDetailerror,
    // requestPending: state.request,
    loginType: props.authSelectors.getAuthAuthenticationType(state),
    downloadPending: state.videoKyc.download.pending,
    downloadError: state.videoKyc.download.error,
  };
};

const mapDispatch = (dispatch) => ({
  actions: bindActionCreators(
    {
      getAuditDetail,
      downloadRecording,
    },
    dispatch
  ),
});

const enhance = compose(withRequestStore, withAuthStore, connect(mapState, mapDispatch));

export default enhance(KycDetailPageContainer);
