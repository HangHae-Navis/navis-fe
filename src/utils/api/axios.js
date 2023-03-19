import axios from "axios";
import { getCookie } from "../infos/cookie";

export default class Axios {
  constructor(url) {
    this.instance = axios.create({
      baseURL: url,
      withCredentials: true,
    });
  }

  async get(url, data) {
    const cookie = getCookie("token");
    const option = {
      headers: {
        Authorization: `${cookie !== null ? cookie : ""}`,
      },
    };
    return this.instance.get(url, option);
  }

  async delete(url) {
    const cookie = getCookie("token");
    const option = {
      headers: {
        Authorization: `${cookie ? cookie : ""}`,
      },
    };
    return this.instance.delete(url, option);
  }

  async post(url, data, option) {
    const cookie = getCookie("token");
    return this.instance.post(url, data, {
      headers: {
        Authorization: `${cookie ? cookie : ""}`,
        ...option,
      },
    });
  }

  async patch(url, data) {
    const cookie = getCookie("token");
    const option = {
      headers: {
        Authorization: `${cookie ? cookie : ""}`,
      },
    };
    const res = axios.patch(url, data, option);
    return res;
  }

  async put(url, data) {
    const cookie = getCookie("token");
    const option = {
      headers: {
        Authorization: `${cookie ? cookie : ""}`,
      },
    };
    return this.instance.put(url, data, option);
  }
}
