export const CLEAR_VIDEO_KYC_VERIFY = 'CLEAR_VIDEO_KYC_VERIFY';

export const VIDEO_KYC_EXTRACT = 'VIDEO_KYC_EXTRACT';
export const VIDEO_KYC_EXTRACT_PENDING = 'VIDEO_KYC_EXTRACT_PENDING';
export const VIDEO_KYC_EXTRACT_FULFILLED = 'VIDEO_KYC_EXTRACT_FULFILLED';
export const VIDEO_KYC_EXTRACT_REJECTED = 'VIDEO_KYC_EXTRACT_REJECTED';

export const VIDEO_KYC_GEO_LOCATION = 'VIDEO_KYC_GEO_LOCATION';
export const VIDEO_KYC_GEO_LOCATION_PENDING = 'VIDEO_KYC_GEO_LOCATION_PENDING';
export const VIDEO_KYC_GEO_LOCATION_FULFILLED = 'VIDEO_KYC_GEO_LOCATION_FULFILLED';
export const VIDEO_KYC_GEO_LOCATION_REJECTED = 'VIDEO_KYC_GEO_LOCATION_REJECTED';

export const VIDEO_KYC_GET_STATUS = 'VIDEO_KYC_GET_STATUS';
export const VIDEO_KYC_GET_STATUS_PENDING = 'VIDEO_KYC_GET_STATUS_PENDING';
export const VIDEO_KYC_GET_STATUS_FULFILLED = 'VIDEO_KYC_GET_STATUS_FULFILLED';
export const VIDEO_KYC_GET_STATUS_REJECTED = 'VIDEO_KYC_GET_STATUS_REJECTED';

export const VIDEO_KYC_GET_TOKEN = 'VIDEO_KYC_GET_TOKEN';
export const VIDEO_KYC_GET_TOKEN_PENDING = 'VIDEO_KYC_GET_TOKEN_PENDING';
export const VIDEO_KYC_GET_TOKEN_FULFILLED = 'VIDEO_KYC_GET_TOKEN_FULFILLED';
export const VIDEO_KYC_GET_TOKEN_REJECTED = 'VIDEO_KYC_GET_TOKEN_REJECTED';

export const VIDEO_KYC_VERIFY = 'VIDEO_KYC_VERIFY';
export const VIDEO_KYC_VERIFY_PENDING = 'VIDEO_KYC_VERIFY_PENDING';
export const VIDEO_KYC_VERIFY_FULFILLED = 'VIDEO_KYC_VERIFY_FULFILLED';
export const VIDEO_KYC_VERIFY_REJECTED = 'VIDEO_KYC_VERIFY_REJECTED';

export const VIDEO_KYC_GET_SESSION = 'VIDEO_KYC_GET_SESSION';
export const VIDEO_KYC_GET_SESSION_PENDING = 'VIDEO_KYC_GET_SESSION_PENDING';
export const VIDEO_KYC_GET_SESSION_FULFILLED = 'VIDEO_KYC_GET_SESSION_FULFILLED';
export const VIDEO_KYC_GET_SESSION_REJECTED = 'VIDEO_KYC_GET_SESSION_REJECTED';

export const VIDEO_KYC_CONFIRM_OTP = 'VIDEO_KYC_CONFIRM_OTP';
export const VIDEO_KYC_CONFIRM_OTP_PENDING = 'VIDEO_KYC_CONFIRM_OTP_PENDING';
export const VIDEO_KYC_CONFIRM_OTP_FULFILLED = 'VIDEO_KYC_CONFIRM_OTP_FULFILLED';
export const VIDEO_KYC_CONFIRM_OTP_REJECTED = 'VIDEO_KYC_CONFIRM_OTP_REJECTED';

export const VIDEO_KYC_AADHAR_VERIFY_PENDING = 'VIDEO_KYC_AADHAR_VERIFY_PENDING';
export const VIDEO_KYC_AADHAR_VERIFY_FULFILLED = 'VIDEO_KYC_AADHAR_VERIFY_FULFILLED';
export const VIDEO_KYC_AADHAR_VERIFY_REJECTED = 'VIDEO_KYC_AADHAR_VERIFY_REJECTED';
export const VIDEO_KYC_AADHAR_VERIFY = 'VIDEO_KYC_AADHAR_VERIFY';

export const VIDEO_KYC_DOWNLOAD_RECORDING_PENDING = 'VIDEO_KYC_DOWNLOAD_RECORDING_PENDING';
export const VIDEO_KYC_DOWNLOAD_RECORDING_FULFILLED = 'VIDEO_KYC_DOWNLOAD_RECORDING_FULFILLED';
export const VIDEO_KYC_DOWNLOAD_RECORDING_REJECTED = 'VIDEO_KYC_DOWNLOAD_RECORDING_REJECTED';
export const VIDEO_KYC_DOWNLOAD_RECORDING = 'VIDEO_KYC_DOWNLOAD_RECORDING';

export const extract = (requestId, formData, callback) => ({
    type: VIDEO_KYC_EXTRACT,
    payload: { formData, requestId, callback },
});

export const verify = (requestId, data, verifyType, callback) => ({
    type: VIDEO_KYC_VERIFY,
    payload: { requestId, data, verifyType, callback },
});

export const aadharVerify = (requestId, callback) => ({
    type: VIDEO_KYC_AADHAR_VERIFY,
    payload: { requestId, callback },
});

export const confirmOtp = (requestId, otp, callback) => ({
    type: VIDEO_KYC_CONFIRM_OTP,
    payload: {requestId, otp, callback}
});

export const clear = () => ({
    type: CLEAR_VIDEO_KYC_VERIFY,
});

export const getGeoLocation = (requestId, longitude, latitude) => ({
    type: VIDEO_KYC_GEO_LOCATION,
    payload: { requestId, longitude, latitude },
});

export const getKycStatus = (requestId) => ({
    type: VIDEO_KYC_GET_STATUS,
    payload: { requestId },
});

export const getToken = (sessionId, callback) => ({
    type: VIDEO_KYC_GET_TOKEN,
    payload: { sessionId, callback },
});

export const getSession = (sessionId, callback) => ({
    type: VIDEO_KYC_GET_SESSION,
    payload: { sessionId, callback },
});

export const downloadRecording = (requestId, callback) => (
    {
        type: VIDEO_KYC_DOWNLOAD_RECORDING,
        payload: {requestId, callback},
    }
);

