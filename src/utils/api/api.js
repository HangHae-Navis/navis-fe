import Axios from "./axios";

const axios = new Axios("http://sparta-kdh.kro.kr/");

//아래서부터 작성

const postSignUp = async (data) => {
  const res = await axios.post("/api/user/signup");
  return res;
};
