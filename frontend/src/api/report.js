import axios from './axiosInstance';

export const fetchSummary = (params) => axios.get('/report/summary', { params });
export const fetchCategoryBreakdown = (params) => axios.get('/report/category-breakdown', { params });
export const fetchTrends = (params) => axios.get('/report/trends', { params });
export const fetchRecurring = () => axios.get('/report/recurring');
export const fetchBankMatch = (params) => axios.get('/report/bank-matches', { params });