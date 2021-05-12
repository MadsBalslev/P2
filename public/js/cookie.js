/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const cookieExist = (cookie) => {
  if (sessionStorage.getItem(cookie)) {
    return true;
  }

  return false;
};

const readCookie = (cookie) => {
  const excerciseSet = sessionStorage.getItem(cookie);
  const json = JSON.parse(excerciseSet);
  return json;
};

const saveState = (name, value) => {
  const strVal = JSON.stringify(value);

  sessionStorage.setItem(name, strVal);
};

const deleteCookie = (name) => {
  sessionStorage.removeItem(name);
};
