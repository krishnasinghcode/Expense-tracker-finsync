import { useState, useEffect } from 'react';
import CategoryManager from '../components/CategoryManager';
import SettingsIcon from '../assets/settingsIcon';

import {
  fetchSummary,
  fetchCategoryBreakdown,
  fetchTrends,
  fetchRecurring,
  fetchBankMatch,
} from '../api/report';

import {
  PieChart, Pie, Cell, Tooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const COLORS = [
  'var(--color-positive)',
  'var(--color-negative)',
  'var(--color-neutral)',
  '#FFBB28',
  '#845EC2',
];


export default function Dashboard() {
  const [showCategory, setShowCategory] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [summary, setSummary] = useState(null);
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [trends, setTrends] = useState([]);
  const [recurring, setRecurring] = useState([]);
  const [bankMatches, setBankMatches] = useState([]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(type && { type }),
      };

      const [s, cb, t, r, bm] = await Promise.all([
        fetchSummary(params),
        fetchCategoryBreakdown(params),
        fetchTrends(params),
        fetchRecurring(),
        fetchBankMatch({}),
      ]);

      setSummary(s.data);
      setCategoryBreakdown(cb.data);
      setTrends(t.data);
      setRecurring(r.data);
      setBankMatches(bm.data);
    } catch (err) {
      setError(err.message || 'Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [startDate, endDate, type]);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="mb-6">
        <button
          onClick={() => setShowCategory(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          style={{
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-primary)',
            border: '1px solid var(--color-secondary)',
            cursor: 'pointer',
            minWidth: '140px',
          }}
        >
          <SettingsIcon size={20} />
          <span className="font-semibold text-lg select-none">Category</span>
        </button>
      </div>

      {showCategory && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-20 z-50"
          onClick={() => setShowCategory(false)}
        >
          <div
            className="rounded shadow-lg p-6 w-[400px] max-h-[80vh] overflow-auto relative"
            style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 font-bold text-2xl leading-none"
              onClick={() => setShowCategory(false)}
              aria-label="Close modal"
              style={{ color: 'var(--color-text)' }}
            >
              &times;
            </button>

            <CategoryManager />
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-center mt-10" style={{ color: 'var(--color-text)' }}>
          Loading reports...
        </p>
      ) : error ? (
        <p className="text-center mt-10 font-semibold" style={{ color: 'var(--color-primary)' }}>
          Error: {error}
        </p>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
            Financial Reports
          </h1>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6 items-center">
            <label className="flex flex-col text-sm font-medium" style={{ color: 'var(--color-text)' }}>
              Start Date
              <input
                type="date"
                className="mt-1 p-2 rounded border"
                style={{
                  borderColor: 'var(--color-secondary)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>

            <label className="flex flex-col text-sm font-medium" style={{ color: 'var(--color-text)' }}>
              End Date
              <input
                type="date"
                className="mt-1 p-2 rounded border"
                style={{
                  borderColor: 'var(--color-secondary)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>

            <label className="flex flex-col text-sm font-medium" style={{ color: 'var(--color-text)' }}>
              Type
              <select
                className="mt-1 p-2 rounded border"
                style={{
                  borderColor: 'var(--color-secondary)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                }}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </label>

            <button
              onClick={loadData}
              className="rounded px-5 py-2 transition"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-text)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              }}
            >
              Refresh
            </button>
          </div>

          {/* Summary */}
          <section className="rounded-lg p-6 mb-8 shadow" style={{ backgroundColor: 'var(--color-bg)', border: `1px solid var(--color-secondary)` }}>
            <h2 className="text-xl font-semibold mb-5" style={{ color: 'var(--color-primary)' }}>
              Summary
            </h2>
            <div className="flex justify-around text-center">
              <div>
                <p>Total Income</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--color-positive)' }}>
                  ₹{summary?.totalIncome ?? 0}
                </p>
              </div>
              <div>
                <p>Total Expense</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--color-negative)' }}>
                  ₹{summary?.totalExpense ?? 0}
                </p>
              </div>
              <div>
                <p>Net Savings</p>
                <p className="text-2xl font-bold" style={{ color: summary?.net >= 0 ? 'var(--color-positive)' : 'var(--color-negative)' }}>
                  ₹{summary?.net ?? 0}
                </p>
              </div>
            </div>
          </section>

          {/* Category Breakdown */}
          <section className="rounded-lg p-6 mb-8 shadow" style={{ backgroundColor: 'var(--color-bg)', border: `1px solid var(--color-secondary)` }}>
            <h2 className="text-xl font-semibold mb-5" style={{ color: 'var(--color-primary)' }}>
              Category Breakdown
            </h2>
            {categoryBreakdown.length === 0 ? (
              <p style={{ color: 'var(--color-text)' }}>No data available.</p>
            ) : (
              <div className="flex justify-center">
                <PieChart width={400} height={300}>
                  <Pie
                    data={categoryBreakdown}
                    dataKey="total"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value}`} />
                  <Legend />
                </PieChart>
              </div>
            )}
          </section>

          {/* Trends */}
          <section className="rounded-lg p-6 mb-8 shadow" style={{ backgroundColor: 'var(--color-bg)', border: `1px solid var(--color-secondary)` }}>
            <h2 className="text-xl font-semibold mb-5" style={{ color: 'var(--color-primary)' }}>
              Trends
            </h2>
            {trends.length === 0 ? (
              <p style={{ color: 'var(--color-text)' }}>No trend data available.</p>
            ) : (
              <div className="overflow-x-auto">
                <LineChart
                  width={600}
                  height={300}
                  data={trends}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral)" />
                  <XAxis dataKey="_id" stroke="var(--color-text)" />
                  <YAxis stroke="var(--color-text)" />
                  <Tooltip formatter={(value) => `₹${value}`} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="var(--color-primary)"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </div>
            )}
          </section>

          {/* Recurring */}
          <section className="rounded-lg p-6 mb-8 shadow" style={{ backgroundColor: 'var(--color-bg)', border: `1px solid var(--color-secondary)` }}>
            <h2 className="text-xl font-semibold mb-5" style={{ color: 'var(--color-primary)' }}>
              Recurring Transactions
            </h2>
            {recurring.length === 0 ? (
              <p style={{ color: 'var(--color-text)' }}>No recurring transactions found.</p>
            ) : (
              <ul className="list-disc pl-5 max-h-48 overflow-auto space-y-2" style={{ color: 'var(--color-text)' }}>
                {recurring.map((item, i) => (
                  <li key={i}>
                    Amount: ₹{item._id.amount}, Count: {item.count}, Notes: {item.examples.join(', ')}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Bank Matches */}
          <section className="rounded-lg p-6 shadow" style={{ backgroundColor: 'var(--color-bg)', border: `1px solid var(--color-secondary)` }}>
            <h2 className="text-xl font-semibold mb-5" style={{ color: 'var(--color-primary)' }}>
              Bank Match Report
            </h2>
            {bankMatches.length === 0 ? (
              <p style={{ color: 'var(--color-text)' }}>No bank matched/unmatched transactions.</p>
            ) : (
              <ul className="list-disc pl-5 max-h-48 overflow-auto space-y-2" style={{ color: 'var(--color-text)' }}>
                {bankMatches.map((item, i) => (
                  <li key={i}>
                    {item.description || 'No description'} — ₹{item.amount} —{' '}
                    <span style={{ color: item.matched ? 'var(--color-positive)' : 'var(--color-negative)' }}>
                      {item.matched ? 'Matched' : 'Unmatched'}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}
