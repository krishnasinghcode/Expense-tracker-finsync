import React, { useState, useEffect } from 'react';
import Button from './Button';
import FormInput from './FormInput';
import { createTransaction, updateTransaction } from '../api/transaction';
import { getCategories } from '../api/category';

const AddTransactionForm = ({ onSuccess, initialData = null }) => {
  const isEdit = !!initialData;

  const [formData, setFormData] = useState({
    type: initialData?.type || 'expense',
    categoryId: initialData?.categoryId?._id || '',
    amount: initialData?.amount || '',
    date: initialData?.date?.split('T')[0] || new Date().toISOString().split('T')[0],
    note: initialData?.note || '',
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      setCategories(res.data || []);
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateTransaction(initialData._id, formData);  // 👈 new API call
      } else {
        await createTransaction(formData);
      }

      setFormData({ type: 'expense', categoryId: '', amount: '', date: '', note: '' });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Transaction error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label font-semibold text-sm">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div>
          <label className="label font-semibold text-sm">Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <FormInput
        label="Amount"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      <FormInput
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <FormInput
        label="Note (optional)"
        name="note"
        value={formData.note}
        onChange={handleChange}
      />

      <Button text="Add Transaction" type="submit" variant="primary" className="w-full" />
    </form>
  );
};

export default AddTransactionForm;
