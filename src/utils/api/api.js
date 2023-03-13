import Axios from "./axios";

const axios = new Axios("http://sparta-kdh.kro.kr/");

//아래서부터 작성

export const postEmailConfirm = async (data) => {
  const res = await axios.get(`/api/emails/sendMail?email=${data}`);
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
