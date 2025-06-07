import { useState, useEffect } from 'react';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../api/category';

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', type: 'expense', color: '#000000', icon: '' });
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
    <div>
      <h2>Manage Categories</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} />
        <input placeholder="Icon (e.g. 💸)" value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} />
        <button type="submit">{editingId ? 'Update' : 'Add'} Category</button>
      </form>

      <ul>
        {categories.map(cat => (
          <li key={cat._id}>
            <span>{cat.icon} {cat.name} ({cat.type})</span>
            <button onClick={() => handleEdit(cat)}>Edit</button>
            <button onClick={() => handleDelete(cat._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
