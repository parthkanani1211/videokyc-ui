import { takeEvery, put, call } from "redux-saga/effects";
import { LOGIN_PENDING, LOGIN_FULFILLED, LOGIN_REJECTED, LOGIN } from "./constants";
import * as API from "../api";

function* login(body) {
  const { formData } = body;
  try {
    yield put({ type: LOGIN_PENDING });
    const payload = yield call(API.login, body);
    yield put({
      type: LOGIN_FULFILLED,
      payload: { ...payload, mobileNumber: formData.mobileNumber },
    });
  } catch (error) {
    const { message: errorMessage } = (error && error.payload) || {
      message: "",
    };
    yield put({
      type: LOGIN_REJECTED,
      payload: errorMessage,
    });
  }
}

export default function* () {
  yield takeEvery(LOGIN, login);
}
