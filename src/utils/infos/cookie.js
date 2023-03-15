import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, data, options) => {
  return cookies.set(name, data, {
    ...options,
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
