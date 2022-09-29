import { loadCookie } from "../cookie";

export const AUTH_TOKEN_COOKIE = "auth-token";
export const REFRESH_TOKEN_COOKIE = "refresh-token";
export const ACCESS_TOKEN = "access_token";
export const REMEMBER_ME = "remember";
export const USER_TOKEN = "user_token";
export const USER_ID = "user_id";

export function getBearerToken() {
  const value = loadCookie(AUTH_TOKEN_COOKIE);
  return value;
}

export function getRefreshToken() {
  const value = loadCookie(REFRESH_TOKEN_COOKIE);
  return value;
}
export function getAccessToken() {
  const value = loadCookie(ACCESS_TOKEN);
  return value;
}
export function getUserToken() {
  const value = loadCookie(USER_TOKEN);
  return value;
}

export function getUserId() {
  const value = loadCookie(USER_ID);
  return value;
}
