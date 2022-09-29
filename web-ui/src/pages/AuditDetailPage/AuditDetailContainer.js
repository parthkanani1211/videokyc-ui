import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import AuditDetailPageView from "./AuditDetailPage";
import { bindActionCreators } from "redux";
import { getAuditDetail } from "../../store/actions/audits";
import { downloadRecording } from "../../store/actions/videoKyc";
import { withRequestStore } from "../../store/request";
import { withAuthStore } from "../../store/auth";
import { ACTIONS } from "../../store/request/constants";

const AuditDetailContainer = (props) => {
  const {
    match,
    actions,
    AuditDetailPending,
    AuditDetailData,
    AuditDetailerror,
    requestActions,
    history,
    downloadPending,
    downloadError,
  } = props;
  const { id } = match.params;

  useEffect(() => {
    actions.getAuditDetail(id);
  }, [id, actions]);

  const handleApproveClick = () => {
    requestActions.update(id, {
      action: ACTIONS.APPROVE,
      comment: "",
    });
    history.push("/audit-report");
  };

  const handleRejectClick = () => {
    requestActions.update(id, {
      action: ACTIONS.REJECT,
      comment: "",
    });
    history.push("/audit-report");
  };

  const handleSubmitClick = () => {
    requestActions.update(id, {
      action: ACTIONS.SUBMIT,
      comment: "",
    });
    history.push("/videoKyc/agent");
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
    <AuditDetailPageView
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

export default enhance(AuditDetailContainer);
