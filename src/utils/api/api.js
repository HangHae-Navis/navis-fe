import { setCookie } from "../infos/cookie";
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

export const getPartyPage = async (payload) =>{
  const res = axios.get("/api/boards/")
  return res
}