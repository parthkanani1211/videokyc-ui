import { toLocalStorage, fromLocalStorage, removeLocalStorage } from "../util/storage";

const localStorageLastLocationKey = "obvs-lastLocation";
const orgIdKey = "ORG_ID";
const authTokenKey = "authToken";

function acceptLocation(lastLocation) {
  if (
    lastLocation &&
    lastLocation.pathname &&
    lastLocation.pathname !== "/" &&
    lastLocation.pathname.indexOf("auth") === -1 &&
    lastLocation.pathname !== "/logout"
  ) {
    return true;
  }

  return false;
}

export function saveLastLocation(lastLocation) {
  const localStorateLocations = fromLocalStorage(localStorageLastLocationKey);
  let _useLocations = localStorateLocations ? JSON.parse(localStorateLocations) : [];

  if (acceptLocation(lastLocation)) {
    _useLocations.push(lastLocation.pathname);
    toLocalStorage(localStorageLastLocationKey, JSON.stringify(_useLocations));
  }
}

export function getLastLocation() {
  // const localStorateLocations = fromLocalStorage(localStorageLastLocationKey);
  // if (!localStorateLocations) {
  return "/";
  // }

  // const _userLocations = JSON.parse(localStorateLocations);
  // const result = _userLocations.length > 0 ? _userLocations.pop() : "/";
  // return result;
}

export const saveOrganizationId = (orgId) => {
  if (orgId) {
    toLocalStorage(orgIdKey, orgId);
  }
};

export const removeOrganizationId = () => {
  removeLocalStorage(orgIdKey);
};

export const getOrganizationId = () => {
  // if (
  //     process.env.NODE_ENV === 'development' &&
  //     process.env.REACT_APP_ORG_ID
  // ) {
  //     return process.env.REACT_APP_ORG_ID;
  // }

  return fromLocalStorage(orgIdKey) || 1;
};

export const saveAuthToken = (token) => {
  if (token) {
    toLocalStorage(authTokenKey, token);
  }
};

export const getAuthToken = () => {
  return fromLocalStorage(authTokenKey);
};

export const removeAuthToken = () => {
  removeLocalStorage(authTokenKey);
};
