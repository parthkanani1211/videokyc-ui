import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createSelector} from 'reselect';
import { autoLogin } from '../../store/actions/session';
import qs from 'qs';

import {
    selectAutoLoginPending,
    selectAutoLoginError,
    selectAutoLoginErrorMessage,
} from '../../store/selectors/session';

import VideoLandingPageComponent from './VideoLandingPage';

export const VideoLandingPage = connect(
    () => {

        const selectParams = (state, props) => props.location.search;
        const selectMobileNumber = createSelector(
            selectParams,
            (param) => qs.parse(param, { ignoreQueryPrefix: true }).mobileNumber,
        );
        
        return (state, props) => ({
            loginPending: selectAutoLoginPending(state),
            loginError: selectAutoLoginError(state),
            loginErrorMessage: selectAutoLoginErrorMessage(state),
            mobileNumber: selectMobileNumber(state, props),
        });
    },
    (dispatch) => ({
        actions: bindActionCreators({
            sessionAutoLogin: autoLogin,
        }, dispatch)
    })
)(VideoLandingPageComponent);