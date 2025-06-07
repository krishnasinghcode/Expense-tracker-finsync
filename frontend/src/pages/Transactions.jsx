import React, { useState, useEffect } from 'react';
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../api/transaction';

import { getCategories } from '../api/category'; // fetch categories

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    type: 'expense',
    amount: '',
    date: '',
    categoryId: '',
    note: ''
  });
  const [editId, setEditId] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  const fetchTransactions = async () => {
    const { data } = await getTransactions();
    setTransactions(data);
  };

  const fetchCategories = async () => {
    const { data } = await getCategories();
    setCategories(data);
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (editId) {
      await updateTransaction(editId, form);
    } else {
      await createTransaction(form);
    }
    setForm({ type: 'expense', amount: '', date: '', categoryId: '', note: '' });
    setEditId(null);
    fetchTransactions();
  };

  const handleEdit = txn => {
    setForm({
      type: txn.type,
      amount: txn.amount,
      date: txn.date.slice(0, 10),
      categoryId: txn.categoryId?._id || txn.categoryId,
      note: txn.note || ''
    });
    setEditId(txn._id);
  };

  const handleDelete = async id => {
    await deleteTransaction(id);
    fetchTransactions();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Transactions</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select name="type" value={form.type} onChange={handleChange} required className="p-2 border rounded">
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          name="note"
          placeholder="Note (optional)"
          value={form.note}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-full md:col-span-1"
        >
          {editId ? 'Update' : 'Add'} Transaction
        </button>
      </form>

      <ul className="space-y-4">
        {transactions.map(txn => (
          <li
            key={txn._id}
            className="p-4 border rounded flex justify-between items-center bg-white shadow-sm"
          >
            <div>
              <div className="font-semibold">{txn.type.toUpperCase()} - ₹{txn.amount}</div>
              <div className="text-sm text-gray-500">
                {new Date(txn.date).toLocaleDateString()} | {txn.categoryId?.name || 'Unknown'}
              </div>
              {txn.note && <div className="text-sm text-gray-400">{txn.note}</div>}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(txn)}
                className="text-yellow-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(txn._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
