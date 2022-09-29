import {
  AuthenticationException,
  PermissionException,
  ServerException,
} from "exceptions";
import axios from "axios";

// import { hydrate } from "utils/persist";
// import { loadCookie, saveCookie } from "utils/cookie";

// import { ApiResult } from "./api.types";
import getResponseContent from "./getResponseContent";
// import { ACCESS_TOKEN, REFRESH_TOKEN_COOKIE, REMEMBER_ME } from "./getTokens";
import makeRequestInit, { makeRequestInitt } from "./makeRequestInit";

export default async function apiFetch(relativeUri, options = {}) {
  try {
    const init = makeRequestInit(options);
    const { keepBaseUri } = options;
    const base = keepBaseUri
      ? process.env.REACT_APP_API_HOST
      : `${process.env.REACT_APP_API_HOST}`;
    const response = await fetch(`${base}${relativeUri}`, init);

    if (response.status >= 400) {
      throw response;
    }

    const result = {
      response,
      data: await getResponseContent(response),
    };

    return result;
  } catch (response) {
    const content = await getResponseContent(response);
    let message;

    if (content && content.message) {
      ({ message } = content);
    }

    if (response.status === 401) {
      throw new AuthenticationException(message);
    }

    if (response.status === 403) {
      throw new PermissionException(message);
    }

    throw new ServerException(content);
  }
}

// let loading = false;
// const delay = (ms) => new Promise((res) => setTimeout(res, ms));
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  timeout: 30000,
});
export const api = async (relativeUri, options = {}) => {
  const init = makeRequestInitt(options);
  try {
    const response = await axiosInstance.request({
      ...init,
      url: relativeUri,
    });
    return response;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      throw new ServerException({
        message: "Something went wrong.",
      });
    }

    // refresh token stuff
    // if (error.response && error.response.status === 403) {
    //   if (loadCookie(REMEMBER_ME) === "false" || hydrate(ACCESS_TOKEN, "cookies") === null) {
    //     window.location.href = "/logout";
    //   } else {
    //     let waited = false;
    //     while (loading) {
    //       waited = true;
    //       await delay(1000);
    //     }
    //     if (hydrate(ACCESS_TOKEN, "cookies") !== null && !waited) {
    //       loading = true;
    //       const response = await axios("/companies/refresh-token", {
    //         method: "post",
    //         headers: { authorization: `Bearer ${hydrate(ACCESS_TOKEN, "cookies")}` },
    //         data: {
    //           refresh_token: hydrate(REFRESH_TOKEN_COOKIE, "cookies"),
    //         },
    //       })
    //         .then(async ({ data }) => {
    //           saveCookie(ACCESS_TOKEN, data.data.access_token);
    //           return await api(relativeUri, options);
    //         })
    //         .finally(() => {
    //           loading = false;
    //         });
    //       return response;
    //     }
    //     if (waited) {
    //       const response = await api(relativeUri, options);
    //       return response;
    //     }
    //   }
    // }

    if (error.response && error.response.status === 400) {
      throw new ServerException({ message: error?.response?.data?.errors });
    }
    if (error.response && error.response.status === 404) {
      throw new ServerException({ message: error?.response?.data?.errors });
    }
    if (error.response && error.response.status === 429) {
      throw new ServerException({
        message: error?.response?.data?.errors?.message,
      });
    }
    if (error.response && error.response.status === 401) {
      throw new AuthenticationException(error.message);
    }
    throw new ServerException({
      message:
        error?.response?.data?.errors?.message || error?.response?.data?.errors,
    });
  }
};
