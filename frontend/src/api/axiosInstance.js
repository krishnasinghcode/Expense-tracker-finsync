// src/api/axiosInstance.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Important: sends refresh token cookie
});

// 🔐 Attach access token to all requests
API.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ♻️ Handle token expiration and retry logic
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

        // Retry original request with new token
        API.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return API(originalRequest);

      } catch (err) {
        // 🔴 Refresh token failed — logout user
        localStorage.removeItem("accessToken");

        // Optional: also call /logout to clear cookies
        // await API.post('/auth/logout');

        // Redirect to login
        window.location.href = "/login";

        return Promise.reject(err); // stop retrying
      }
    }

    return Promise.reject(error);
  }
);

export default API;
