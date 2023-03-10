import axios from "axios";

export default class Axios {
  constructor(url) {
    this.instance = axios.create({
      baseURL: url,
    });
  }

  async get(url) {
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ""}`,
      },
    };
    return this.instance.get(url, option);
  }

  async delete(url) {
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ""}`,
      },
    };
    return this.instance.delete(url, option);
  }

  async post(url, data) {
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ""}`,
      },
    };
    return this.instance.post(url, data);
  }

  async patch(url, data) {
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ""}`,
      },
    };
    const res = axios.patch(url, data, option);
    return res;
  }

  async put(url, data) {
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ""}`,
      },
    };
    return this.instance.put(url, data, option);
  }
}
