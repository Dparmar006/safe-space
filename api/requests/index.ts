import axios from "axios";
const BASE_URL = process.env.BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {},
});

if (typeof window !== "undefined") {
  // Check if `localStorage` is available in the browser
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (accessToken) {
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  if (refreshToken) {
    api.defaults.headers.common["x-refresh-token"] = refreshToken;
  }

  api.interceptors.request.use((req) => {
    if (accessToken) req.headers.Authorization = `Bearer ${accessToken}`;
    if (refreshToken) req.headers["x-refresh-token"] = refreshToken;
    return req;
  });

  api.interceptors.response.use(
    (res) => {
      if (res.headers.authorization) {
        localStorage.setItem("accessToken", res.headers.authorization);
      }
      if (res.headers["x-refresh-token"]) {
        localStorage.setItem("refreshToken", res.headers["x-refresh-token"]);
      }
      return res;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
}

export default api;
