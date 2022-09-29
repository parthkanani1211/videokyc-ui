import cookie from "cookie";

/**
 *
 * @param {string} name
 * @param {boolean | undefined} doNotParse
 * @param {CookieParseOptions | undefined} opt
 * @returns {object | undefined}
 */
export function loadCookie(name, doNotParse, opt) {
  const cookies = cookie.parse(document.cookie, opt);
  let cookieVal = cookies && cookies[name];

  if (typeof doNotParse === "undefined") {
    // eslint-disable-next-line
    doNotParse = !cookieVal || (cookieVal[0] !== "{" && cookieVal[0] !== "[");
  }

  if (!doNotParse) {
    try {
      cookieVal = JSON.parse(cookieVal);
    } catch (e) {
      // Not serialized object
    }
  }

  return cookieVal;
}

/**
 *
 * @param {string} name
 * @param {any} val
 * @param {CookieParseOptions|undefined} opt
 */
export function saveCookie(name, val, opt) {
  document.cookie = cookie.serialize(name, typeof val === "object" ? JSON.stringify(val) : val, {
    path: "/",
    ...opt,
  });
}

/**
 *
 * @param {string} name
 * @param {CookieSerializeOptions | undefined} opt
 */
export function removeCookie(name, opt) {
  if (typeof document !== "undefined") {
    document.cookie = cookie.serialize(name, "", {
      path: "/",
      expires: new Date(1970, 1, 1, 0, 0, 1),
      maxAge: 0,
      ...opt,
    });
  }
}
