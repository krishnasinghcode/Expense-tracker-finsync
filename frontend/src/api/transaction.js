import axios from './axiosInstance';

export const getTransactions = () => axios.get('/transaction');
export const createTransaction = (data) => axios.post('/transaction', data);
export const updateTransaction = (id, data) => axios.put(`/transaction/${id}`, data);
export const deleteTransaction = (id) => axios.delete(`/transaction/${id}`);

