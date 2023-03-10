import axios from "axios";
import { getCookie } from "../infos/cookie";

export default class Axios {
  constructor(url) {
    this.instance = axios.create({
      baseURL: url,
    });
  }

  async get(url) {
    const cookie = getCookie("token");
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ""}`,
      },
    };
    return this.instance.get(url, option);
  }

  async delete(url) {
    const cookie = getCookie("token");
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ""}`,
      },
    };
    return this.instance.delete(url, option);
  }

  async post(url, data) {
    const cookie = getCookie("token");
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ""}`,
      },
    };
    return this.instance.post(url, data, option);
  }

  async patch(url, data) {
    const cookie = getCookie("token");
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ""}`,
      },
    };
    const res = axios.patch(url, data, option);
    return res;
  }

  async put(url, data) {
    const cookie = getCookie("token");
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ""}`,
      },
    };
    return this.instance.put(url, data, option);
  }
}
