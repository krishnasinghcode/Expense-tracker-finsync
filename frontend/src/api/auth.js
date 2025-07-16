// src/api/auth.js
import API from './axiosInstance.js'; // Make sure the file is named axiosInstance.js

export const loginUser = (data) => API.post('/auth/login', data);
export const signupUser = (data) => API.post('/auth/signup', data);
export const getCurrentUser = () => API.get('/auth/user');
export const logoutUser = () => API.post('/auth/logout');
