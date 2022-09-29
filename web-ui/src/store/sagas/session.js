import { takeEvery, put, call, select } from "redux-saga/effects";

import * as actions from "../actions/session";
import * as authActions from "../auth/authentication/constants";
// import * as roleActions from '../actions/roles';
import * as API from "../api/session";
// import * as ROLE_API from '../api/roles';

// import { reset as usersReset } from './users';
// import { reset as rolesReset } from './roles';

import { toLocalStorage, fromLocalStorage } from "../../util/storage";

function* login(action) {
  const { username, password } = action.payload;
  try {
    yield put({ type: actions.SESSION_LOGIN_PENDING });
    const payload = yield call(API.login, username, password);
    const { token, id, role } = payload;
    yield toLocalStorage("authToken", token);
    const user = {
      id,
      username,
      role,
    };
    yield put({ type: actions.SESSION_LOGIN_FULFILLED, payload });
    yield put({
      type: actions.SESSION_CONSTRUCT,
      payload: { user, authToken: token },
    });
  } catch (error) {
    const { error: errorMessage } = (error && error.payload) || {
      error: "",
    };
    yield put({
      type: actions.SESSION_LOGIN_REJECTED,
      payload: errorMessage,
    });
    yield call(sessionErrorHandling, error);
  }
}

function* autoLogin(action) {
  const { username, callback } = action.payload;
  try {
    yield put({ type: actions.SESSION_AUTO_LOGIN_PENDING });
    const { otpCode } = yield call(API.login, username);
    const otpRequest = {
      otpCode: otpCode.code,
      mobileNumber: username,
    };
    const payload = yield call(API.validateOtp, otpRequest);
    const { token, userDto } = payload;
    yield toLocalStorage("authToken", token);
    yield put({ type: actions.SESSION_AUTO_LOGIN_FULFILLED, payload });
    yield put({
      type: actions.SESSION_CONSTRUCT,
      payload: { user: userDto, authToken: token },
    });
    if (callback) {
      callback();
    }
  } catch (error) {
    const { error: errorMessage } = (error && error.payload) || {
      error: "",
    };
    yield put({
      type: actions.SESSION_AUTO_LOGIN_REJECTED,
      payload: errorMessage,
    });
    yield call(sessionErrorHandling, error);
  }
}

function* construct(action) {
  const authToken = fromLocalStorage("authToken", null);

  if (!authToken) {
    yield put({ type: actions.SESSION_LOGOUT, payload: { manual: false } });
    return;
  }

  try {
    yield put({ type: actions.SESSION_CONSTRUCT_PENDING });
    const payload = yield call(API.getCurrentUser);
    yield put({
      type: actions.SESSION_USER_OBJECT,
      payload: { user: payload.userDto },
    });

    yield put({
      type: authActions.AUTHENTICATE_FULFILLED,
      payload,
    });

    // const roles = yield call(ROLE_API.getRoles);
    // yield put({ type: roleActions.ROLES_LIST_FULFILLED, payload: roles });

    yield put({ type: actions.SESSION_CONSTRUCT_FULFILLED });
  } catch (error) {
    const { error: errorMessage } = (error && error.payload) || {
      error: "",
    };
    yield put({
      type: actions.SESSION_CONSTRUCT_REJECTED,
      payload: errorMessage,
    });
    yield call(sessionErrorHandling, error);
  }
}

export function* reset() {
  // Clear other stuff from store.
  yield toLocalStorage("authToken", null);

  // try {
  //     yield all([
  //         call(usersReset),
  //         call(rolesReset),
  //     ]);
  // }
  // catch (error) {
  //     throw error;
  // }
}

function* deconstruct() {
  //TODO clear up the session.
  yield call(reset);
}

function* logout(action) {
  const { manual } = action.payload;
  if (manual) {
    yield toLocalStorage("obvs-lastLocation", "");
  }
  yield put({ type: actions.SESSION_DECONSTRUCT });
}

export function* sessionErrorHandling(error) {
  if (error && error.response) {
    const { response } = error;
    if (response.status === 401) {
      const constructPending = yield select((state) => state.session.construct.pending);
      if (constructPending) {
        yield put({
          type: actions.SESSION_CONSTRUCT_REJECTED,
          payload: error,
        });
      }
      yield put({
        type: actions.SESSION_LOGOUT,
        payload: { manual: false },
      });
      return;
    }
    return response.status;
  }
}

export default function* () {
  yield takeEvery(actions.SESSION_LOGIN, login);
  yield takeEvery(actions.SESSION_AUTO_LOGIN, autoLogin);
  yield takeEvery(actions.SESSION_CONSTRUCT, construct);
  yield takeEvery(actions.SESSION_DECONSTRUCT, deconstruct);
  yield takeEvery(actions.SESSION_LOGOUT, logout);
}
