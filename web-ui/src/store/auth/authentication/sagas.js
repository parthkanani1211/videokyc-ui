import { takeEvery, put, call } from "redux-saga/effects";
import {
  AUTHENTICATE_PENDING,
  AUTHENTICATE_FULFILLED,
  AUTHENTICATE_REJECTED,
  AUTHENTICATE,
} from "./constants";
import * as API from "../api";
// import { saveAuthToken } from '../../../router/RouterHelpers';
import * as sessionActions from "../../actions/session";
import { toLocalStorage } from "../../../util/storage";

function* authenticate(body) {
  try {
    yield put({ type: AUTHENTICATE_PENDING });
    const payload = yield call(API.authenticate, body);
    const { token, userDto } = payload;
    yield toLocalStorage("authToken", token);
    yield put({
      type: AUTHENTICATE_FULFILLED,
      payload,
    });
    yield put({
      type: sessionActions.SESSION_CONSTRUCT,
      payload: { user: userDto, authToken: token },
    });
  } catch (error) {
    const { message: errorMessage } = (error && error.payload) || {
      message: "",
    };
    yield put({
      type: AUTHENTICATE_REJECTED,
      payload: errorMessage,
    });
    yield put({
      type: sessionActions.SESSION_LOGIN_REJECTED,
      payload: errorMessage,
    });
  }
}

export default function* () {
  yield takeEvery(AUTHENTICATE, authenticate);
}
