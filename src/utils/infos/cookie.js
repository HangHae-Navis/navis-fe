import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, data, options) => {
  const expires = new Date();
  return cookies.set(name, data, {
    ...options,
    expires,
  });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name, options) => {
  return cookies.remove(name, {
    ...options,
  });
};
