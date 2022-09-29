import { createSelector } from 'reselect';

export const selectVideoKyc = (state) => state.videoKyc;
export const selectVideoKycStatus = (state) => state.videoKyc.status;
export const selectKycSession = (state) => state.videoKyc.session;
export const selectKycRequestToken = (state) => state.videoKyc.token;
export const selectConfirmOTPPending = (state) => state.videoKyc.confirmOtp.pending;

export const selectFormattedData = createSelector(
    selectVideoKyc,
    (videoKyc) => {
        let newResult = {};

        Object.keys(videoKyc).forEach((key) => {
            newResult[key] = {
                ...videoKyc[key],
                isVerified: videoKyc[
                    key
                ]?.data?.kycVerificationData?.verified,
                isVerifiedResponse: videoKyc[
                    key
                ]?.responseData?.verified,
            };
        });

        return newResult;
    }
);

export const selectGeoLocation = (state) => state.videoKyc.geoLocation;

export const selectGeoCountry = createSelector(
    selectGeoLocation,
    (location) => {
        let country = '';

        if (location && location.address) {
            country = location.address.country_code;
        }

        return country;
    }
);

export const selectCurrentState = createSelector(
    selectVideoKycStatus,
    (status) => {
        if (!status || status.length < 1) {
            return 0;
        }
        return status.length;
    }
);

export const selectPendingStatus = createSelector(
    selectVideoKyc,
    (videoKyc) => {
        if (videoKyc.getKycStatus) {
            return videoKyc.getKycStatus.pending;
        }
        return false;
    }
);

export const selectKycDbStatus = createSelector(
    selectVideoKycStatus,
    (status) => {
        let stat = {};

        if (!status || status.length < 1) {
            return null;
        }

        status.forEach(st => {
            stat = {
                ...stat,
                [st]: "SUCCESS",
            }
        });

        return stat;
    }
)

export const selectToken = createSelector(
    selectKycRequestToken,
    (token) => {
        return token && token['0'];
    }
);

export const selectConfirmOTPError = createSelector(
    (state) => state.videoKyc,
    (session) => session.confirmOtp['errorMessage']
);
