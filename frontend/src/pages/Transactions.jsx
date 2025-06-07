import React, { useState, useEffect } from 'react';
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../api/transaction';
import { getCategories } from '../api/category';

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
  const [showFormModal, setShowFormModal] = useState(false);

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

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if(editId) {
      await updateTransaction(editId, form);
    } else {
      await createTransaction(form);
    }
    setForm({
      type: 'expense',
      amount: '',
      date: '',
      categoryId: '',
      note: ''
    });
    setEditId(null);
    setShowFormModal(false);
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
    setShowFormModal(true);
  };

  const handleDelete = async id => {
    await deleteTransaction(id);
    fetchTransactions();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-background text-text">
      <h1 className="text-3xl font-bold text-primary mb-6">Manage Transactions</h1>

      <button
        onClick={() => {
          setEditId(null);
          setForm({ type: 'expense', amount: '', date: '', categoryId: '', note: '' });
          setShowFormModal(true);
        }}
        className="mb-6 px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition"
      >
        + Add New Transaction
      </button>

      {/* Modal Form */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-background p-6 rounded-xl w-full max-w-2xl relative shadow-xl border border-secondary">
            <button
              onClick={() => {
                setShowFormModal(false);
                setEditId(null);
              }}
              className="absolute top-3 right-4 text-text hover:text-primary text-xl font-bold"
            >
              ×
            </button>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
                className="p-2 border border-secondary bg-background rounded"
              >
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
                className="p-2 border border-secondary bg-background rounded"
              />

              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
                className="p-2 border border-secondary bg-background rounded"
              />

              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                required
                className="p-2 border border-secondary bg-background rounded"
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
                className="p-2 border border-secondary bg-background rounded md:col-span-2"
              />

              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 col-span-full transition"
              >
                {editId ? 'Update' : 'Add'} Transaction
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Table View */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-background border border-secondary rounded shadow-sm">
          <thead>
            <tr className="bg-muted text-text border-b border-secondary">
              <th className="p-3">Date</th>
              <th className="p-3">Type</th>
              <th className="p-3">Amount (₹)</th>
              <th className="p-3">Category</th>
              <th className="p-3">Note</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map(txn => (
                <tr key={txn._id} className="hover:bg-muted transition">
                  <td className="p-3 border-b border-secondary">
                    {new Date(txn.date).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-b border-secondary capitalize">{txn.type}</td>
                  <td
                    className="p-3 border-b border-secondary"
                    style={{
                      color:
                        txn.type === 'income'
                          ? 'var(--color-positive)'
                          : txn.type === 'expense'
                          ? 'var(--color-negative)'
                          : 'var(--color-neutral)',
                    }}
                  >
                    ₹{txn.amount}
                  </td>
                  <td className="p-3 border-b border-secondary">{txn.categoryId?.name || 'Unknown'}</td>
                  <td className="p-3 border-b border-secondary">{txn.note || '-'}</td>
                  <td className="p-3 border-b border-secondary text-center space-x-3">
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
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
