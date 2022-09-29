import { getBearerToken, getAccessToken, getUserToken } from "./getTokens";
import makeHeaders from "./makeHeaders";

const generateDefaults = () => {
  const headers = {};
  const accessToken = getAccessToken();
  const authToken = getBearerToken();
  const userToken = getUserToken();
  if (userToken) {
    headers["access-token"] = userToken;
  } else if (accessToken) {
    headers["access-token"] = accessToken;
  }
  if (accessToken) {
    headers["auth-token"] = authToken;
  }

  return {
    method: "GET",
    headers: {
      // Need to add logic for refresh tokens
      ...headers,
    },
  };
};
const generateApiDefaults = () => {
  const headers = {};
  const accessToken = getAccessToken();
  if (accessToken) {
    headers.authorization = `Bearer ${accessToken}`;
  }

  return {
    method: "get",
    headers: {
      ...headers,
    },
  };
};
const noTransformList = ["Blob", "ArrayBuffer", "FormData", "URLSearchParams", "ReadableStream"];

function shouldStringify(body) {
  if (typeof body === "string") {
    return false;
  }

  if (
    body.constructor &&
    body.constructor.name &&
    noTransformList.some((proto) => body.constructor.name === proto)
  ) {
    return false;
  }

  return true;
}

export default function makeRequestInit(overrides) {
  const init = {
    ...generateDefaults(),
    ...overrides,
  };
  // Convert object to Headers object
  if (init.headers && typeof init.headers === "object") {
    init.headers = makeHeaders(init.headers);
  } else {
    init.headers = undefined;
  }
  // Automatically stringify body
  if (init.body && shouldStringify(init.body)) {
    init.body = JSON.stringify(init.body);
  }
  return init;
}

export const makeRequestInitt = (overrides) => {
  const init = {
    ...generateApiDefaults(),
    ...overrides,
  };
  return init;
};
