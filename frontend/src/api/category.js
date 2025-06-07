import axios from './axiosInstance'; // assuming axiosInstance has baseURL set

export const getCategories = () => axios.get('/categories');
export const addCategory = (category) => axios.post('/categories', category);
export const updateCategory = (id, updatedData) => axios.put(`/categories/${id}`, updatedData);
export const deleteCategory = (id) => axios.delete(`/categories/${id}`);
