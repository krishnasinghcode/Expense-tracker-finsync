// api/user.js
import axios from './axiosInstance';

// Get user profile (includes preferences)
export const getUserProfile = () => axios.get('/api/user/profile');

// Update user preferences
export const updateUserPreferences = (preferences) => 
  axios.put('/api/user/preferences', preferences);

export const logoutUser = async () => {
  return axios.post('/api/auth/logout');
};