import { getCookie, setCookie } from "../infos/cookie";
import { setLocalStorage } from "../infos/localStorage";
import Axios from "./axios";

const axios = new Axios(process.env.REACT_APP_BASEURL);

//아래서부터 작성

export const postEmailConfirm = async (data) => {
  const res = await axios.get(`/api/emails/sendmail?email=${data}`);
  return res;
};

export const getEmailVerify = async (data) => {
  const res = await axios.get(`/api/emails/confirm?key=${data}`);
  return res;
};

export const postSignUp = async (data) => {
  const res = await axios.post("/api/user/signup", data);
  return res;
};

export const postSignIn = async (data) => {
  const res = await axios.post("/api/user/login", data);
  setLocalStorage("userInfo", res?.data?.data.nickname);
  setCookie("token", res?.data?.data.token);
  return res;
};

export const getKaKaoLogin = async (payload) => {
  if (payload !== null) {
    const res = await axios.get(`/api/user/kakao/callback${payload}`);
    return res;
  }
};

export const getPartyPage = async (payload) => {
  const res = axios.get(
    `/api/groups?page=${payload.page}&size=${payload.size}&category=${payload.category}`
  );
  return res;
};

export const postGroup = async (payload) => {
  const res = axios.post("/api/groups", payload);
  return res;
};

export const postGroupApply = async (groupCode) => {
  const res = axios.post(`/api/groups/apply`, groupCode);
  return res;
};

export const getGroupPosts = async (groupId) => {
  const res = axios.post(`/api/${groupId}/boards/posts`);
  return res;
};

export const postGroupPost = async (groupId, data) => {
  const res = axios.post(`/api/${groupId}/boards/posts`, data);
  return res;
};
