import { loadCookie, saveCookie } from "./cookie";

/**
 * Store object in cookies, sessionStorage, or localStorage
 * Pure function, returns original object.
 *
 * @function persist
 * @param {string} name - key to save under
 * @param {object} obj - object to store
 * @param {"cookies" | "sessionStorage" | "localStorage"} store - the store to load the serialized value from
 * @returns {object} - original object
 */
export const persist = (name, obj, store = "cookies") => {
  switch (store) {
    case "sessionStorage": {
      sessionStorage.setItem(name, JSON.stringify(obj));
      break;
    }
    case "localStorage": {
      localStorage.setItem(name, JSON.stringify(obj));
      break;
    }
    default:
      saveCookie(name, obj);
      break;
  }

  return obj;
};

/**
 * Returns object stored in cookies, sessionStorage, or localStorage
 * by name and accepts default values.
 *
 * Pure function, returns object with values and/or defaults.
 *
 * @function hydrate
 * @param {string} name - key to load from
 * @param {"cookies" | "sessionStorage" | "localStorage"} store - the store to load the serialized value from
 * @param {object} keysWithDefaults - object with default values associated with keys
 * @returns {object | null} - deserialized values with defaults if specified keys did not exist
 */
export const hydrate = (name, store = "cookies", keysWithDefaults) => {
  let content;

  switch (store) {
    case "sessionStorage": {
      const serialized = sessionStorage.getItem(name);
      if (serialized) {
        content = JSON.parse(serialized);
      }
      break;
    }
    case "localStorage": {
      const serialized = localStorage.getItem(name);
      if (serialized) {
        content = JSON.parse(serialized);
      }
      break;
    }
    default:
      content = loadCookie(name);
      break;
  }

  if (!content) {
    return keysWithDefaults || null;
  }

  if (keysWithDefaults) {
    return Object.entries(keysWithDefaults).reduce((results, [key, value]) => {
      // If a key does not have a value, set the default value for that key
      if (!results[key]) {
        // eslint-disable-next-line no-param-reassign
        results[key] = value;
      }

      return results;
    }, content);
  }

  return content;
};
