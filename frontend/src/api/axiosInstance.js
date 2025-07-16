// src/api/axiosInstance.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// 🔐 Attach token in all requests
API.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ♻️ Refresh expired access token
API.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await API.get("/auth/refresh-token");

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        API.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return API(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
