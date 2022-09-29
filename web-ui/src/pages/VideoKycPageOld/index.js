import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import VideoKycPageComponent from './VideoKycPage';
import { verify, clear, getGeoLocation } from '../../store/actions/videoKyc';
import { selectFormattedData, selectGeoLocation, selectGeoCountry} from '../../store/selectors/videoKyc';

const mapState = (state) => {
    return { 
        videoKyc: selectFormattedData(state),
        geoLocation: selectGeoLocation(state),
        geoCountry: selectGeoCountry(state),
    };
};

const mapDispatch = (dispatch) => ({
    actions: bindActionCreators(
        {
            verify,
            clear,
            getGeoLocation,
        },
        dispatch
    ),
});

export const VideoKycPage = connect(
    mapState,
    mapDispatch
)(VideoKycPageComponent);
