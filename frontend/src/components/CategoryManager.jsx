import { useState, useEffect } from 'react';
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory
} from '../api/category';

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '',
    type: 'expense',
    color: '#000000',
    icon: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const { data } = await getCategories();
    setCategories(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateCategory(editingId, form);
    } else {
      await addCategory(form);
    }
    setForm({ name: '', type: 'expense', color: '#000000', icon: '' });
    setEditingId(null);
    loadCategories();
  };

  const handleEdit = (cat) => {
    setForm(cat);
    setEditingId(cat._id);
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    loadCategories();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-background text-text rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-primary mb-4">Manage Categories</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-background border border-secondary p-4 rounded-lg mb-6 space-y-4"
      >
        <div className="flex flex-col">
          <label className="text-sm mb-1">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            className="p-2 border border-secondary rounded bg-background text-text"
            placeholder="Enter category name"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Type</label>
          <select
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            className="p-2 border border-secondary rounded bg-background text-text"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Color</label>
          <input
            type="color"
            value={form.color}
            onChange={e => setForm({ ...form, color: e.target.value })}
            className="w-16 h-10 p-1 rounded border border-secondary bg-background"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Icon</label>
          <input
            type="text"
            value={form.icon}
            onChange={e => setForm({ ...form, icon: e.target.value })}
            className="p-2 border border-secondary rounded bg-background text-text"
            placeholder="e.g. 💸"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:opacity-90"
        >
          {editingId ? 'Update' : 'Add'} Category
        </button>
      </form>

      <ul className="space-y-3">
        {categories.map((cat) => (
          <li
            key={cat._id}
            className="flex justify-between items-center bg-background border border-secondary p-3 rounded"
          >
            <span className="text-base">
              <span className="mr-2">{cat.icon}</span>
              {cat.name} <span className="text-sm text-secondary">({cat.type})</span>
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(cat)}
                className="text-sm px-3 py-1 rounded bg-primary text-white hover:opacity-90"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(cat._id)}
                className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:opacity-90"
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
