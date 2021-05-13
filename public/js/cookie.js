/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Will check if a given cookie exists in the session storage
 * @param {string} cookie The name of the cookie to check for
 * @returns {boolean} A boolean indicating if cookie was found or not
 */
const cookieExist = (cookie) => {
  if (sessionStorage.getItem(cookie)) {
    return true;
  }

  return false;
};

/**
 * Will read a given cookie from the session storage
 * @param {string} cookie The name of the cookie to read
 * @returns {{}} The value of the cookie
 */
const readCookie = (cookie) => {
  const excerciseSet = sessionStorage.getItem(cookie);
  const json = JSON.parse(excerciseSet);
  return json;
};

/**
 * Will save a cookie in the session storage
 * @param {string} name The name of the cookie to store
 * @param {string} value The value of the cookie to store
 */
const saveState = (name, value) => {
  const strVal = JSON.stringify(value);

  sessionStorage.setItem(name, strVal);
};

/**
 * Will delete a given cookie
 * @param {string} name The cookie to delete
 */
const deleteCookie = (name) => {
  sessionStorage.removeItem(name);
};


