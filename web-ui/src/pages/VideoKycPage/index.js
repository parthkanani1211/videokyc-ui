import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import VideoKycPageComponent from './VideoKycPage';
import {
    verify,
    extract,
    clear,
    getGeoLocation,
    getKycStatus,
    getSession,
    getToken,
    confirmOtp,
    aadharVerify,
} from '../../store/actions/videoKyc';

import { withAuthStore } from '../../store/auth';
import { withRequestStore } from '../../store/request';
import {selectHideUserDetails} from '../../store/selectors/session';

import {
    selectFormattedData,
    selectGeoLocation,
    selectGeoCountry,
    selectCurrentState,
    selectPendingStatus,
    selectKycDbStatus,
    selectToken,
    selectKycSession,
    selectConfirmOTPPending,
    selectConfirmOTPError,
} from '../../store/selectors/videoKyc';

const mapState = (state, props) => {

    const selectSessionId = (state, props) => props.match.params.sessionId;

    return {
        videoKyc: selectFormattedData(state),
        geoLocation: selectGeoLocation(state),
        geoCountry: selectGeoCountry(state),
        requestSingleData: props.requestSelectors.getRequestSingleData(state),
        participantName: props.authSelectors.getAuthAuthenticationUsername(state),
        loginType: props.authSelectors.getAuthAuthenticationType(state),
        requestSessionName: props.requestSelectors.getRequestSingleSessionName(state),
        authAuthenticationId: props.authSelectors.getAuthAuthenticationId(state),
        currentState: selectCurrentState(state),
        kycDbStatus: selectKycDbStatus(state),
        currentStatusPending: selectPendingStatus(state),
        sessionId: selectSessionId(state, props),
        token: selectToken(state),
        serverKycSession: selectKycSession(state),
        confirmOtpPending: selectConfirmOTPPending(state),
        confirmOtpError:selectConfirmOTPError(state),
        hideUserDetails: selectHideUserDetails(state),
    };
};

const mapDispatch = (dispatch) => ({
    actions: bindActionCreators(
        {
            verify,
            extract,
            confirmOtp,
            aadharVerify,
            clear,
            getGeoLocation,
            getKycStatus,
            getSession,
            getToken,
        },
        dispatch
    ),
});

const enhance = compose(
    withAuthStore,
    withRequestStore,
    connect(mapState, mapDispatch)
);

export const VideoKycPage = enhance(VideoKycPageComponent);
