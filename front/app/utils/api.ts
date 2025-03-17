import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    withCredentials: true,
  },
  timeout: 1000,
});

const api = {
  get: async (url: string, query?: { [key: string]: string }) => {
    if (query) {
      url += "?" + new URLSearchParams(query).toString();
    }
    return await instance.get(url);
  },
  post: async (
    url: string,
    data: URLSearchParams | JSON | { [key: string]: string },
    query?: { [key: string]: string },
    config?: { [key: string]: string | boolean }
  ) => {
    if (query) {
      url += "?" + new URLSearchParams(query).toString();
    }
    return await instance.post(url, data, config);
  },
  delete: async (url: string, query?: { [key: string]: string }) => {
    if (query) {
      url += "?" + new URLSearchParams(query).toString();
    }
    return await instance.delete(url);
  },
  patch: async (
    url: string,
    data: URLSearchParams | JSON,
    query?: { [key: string]: string },
    config?: { [key: string]: string | boolean }
  ) => {
    if (query) {
      url += "?" + new URLSearchParams(query).toString();
    }
    return await instance.patch(url, data, config);
  },
  setToken: (token: string) => {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  },
  restoreToken: () => {
    const token = localStorage.getItem("token");
    if (token) {
      api.setToken(token);
    }
  },
};

export default api;
