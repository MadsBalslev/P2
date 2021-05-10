const cookieExist = (cookie) => {
  if (localStorage.getItem(cookie)) {
    return true;
  }
  return false;
};

const readCookie = (cookie) => localStorage.getItem(cookie);

const setCookie = (cookie, value) => {
  localStorage.setItem(cookie, value);
};

const useCookie = (cookie) => {
  if (cookieExist(cookie)) {
    const state = readCookie(cookie);
    console.log(state);
  } else {
    setCookie(cookie, 'start');
  }
};

useCookie('state');
