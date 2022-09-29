import { decode } from 'querystring';

/**
 * Creates query string from object
 *
 * @param {object} obj - object to create query from
 * @returns {string} - query string
 */

export const buildQuery = (obj: { [key: string]: any }): string =>
  Object.entries(obj)
    .reduce((str, [key, value]) => {
      if (value === undefined) {
        return value;
      }

      return `${str}&${key}=${JSON.stringify(value)}`;
    }, '')
    .substr(1);

/**
 * Creates object from query string
 *
 * @param {string} obj - query string or url
 * @returns {object} - object to created from query string
 */
export const urlQueryToObj = (url: string) => {
  const queryString = url ? url.split('?')[1] : url;

  return decode(queryString);
};
