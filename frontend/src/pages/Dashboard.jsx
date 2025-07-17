import React, { useState, useEffect } from 'react';
import CategoryManager from '../components/CategoryManager';
import Button from '../components/Button';
import SimpleDateFilter from '../components/SimpleDateFilter';

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

const COLORS = ['#22c55e', '#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6'];

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
    <div className="min-h-screen bg-base-100 text-base-content p-6">
      <div className="mb-6">
        <Button text="Category" variant="primary" onClick={() => setShowCategory(true)} />
      </div>

      {showCategory && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setShowCategory(false)}
            >
              ✕
            </button>
            <CategoryManager />
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-center mt-10">Loading reports...</p>
      ) : error ? (
        <p className="text-center mt-10 text-error font-semibold">Error: {error}</p>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4 text-primary">Financial Reports</h1>

          {/* Filters */}
          <SimpleDateFilter
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            type={type}
            setType={setType}
            loadData={loadData}
          />

          {/* Summary */}
          <div className="card bg-base-200 shadow mb-8 p-6">
            <h2 className="text-xl font-semibold mb-5 text-primary">Summary</h2>
            <div className="flex justify-around text-center">
              <div>
                <p>Total Income</p>
                <p className="text-2xl font-bold text-success">₹{summary?.totalIncome ?? 0}</p>
              </div>
              <div>
                <p>Total Expense</p>
                <p className="text-2xl font-bold text-error">₹{summary?.totalExpense ?? 0}</p>
              </div>
              <div>
                <p>Net Savings</p>
                <p className={`text-2xl font-bold ${summary?.net >= 0 ? 'text-success' : 'text-error'}`}>₹{summary?.net ?? 0}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 p-6 bg-base-100 text-base-content">
            {/* Category Breakdown */}
            <div className="card flex-1 bg-base-200 shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-5 text-primary">Category Breakdown</h2>
              {categoryBreakdown.length === 0 ? (
                <p className="text-base-content/70">No data available.</p>
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
            </div>

            {/* Trends */}
            <div className="card flex-1 bg-base-200 shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-5 text-primary">Trends</h2>
              {trends.length === 0 ? (
                <p className="text-base-content/70">No trend data available.</p>
              ) : (
                <div className="overflow-x-auto">
                  <LineChart
                    width={500}
                    height={300}
                    data={trends}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${value}`} />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#3b82f6" activeDot={{ r: 8 }} />
                  </LineChart>
                </div>
              )}
            </div>
          </div>

          {/* Recurring */}
          <div className="card bg-base-200 shadow mb-8 p-6">
            <h2 className="text-xl font-semibold mb-5 text-primary">Recurring Transactions</h2>
            {recurring.length === 0 ? (
              <p>No recurring transactions found.</p>
            ) : (
              <ul className="list-disc pl-5 max-h-48 overflow-auto space-y-2">
                {recurring.map((item, i) => (
                  <li key={i}>Amount: ₹{item._id.amount}, Count: {item.count}, Notes: {item.examples.join(', ')}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Bank Matches */}
          <div className="card bg-base-200 shadow p-6">
            <h2 className="text-xl font-semibold mb-5 text-primary">Bank Match Report</h2>
            {bankMatches.length === 0 ? (
              <p>No bank matched/unmatched transactions.</p>
            ) : (
              <ul className="list-disc pl-5 max-h-48 overflow-auto space-y-2">
                {bankMatches.map((item, i) => (
                  <li key={i}>
                    {item.description || 'No description'} — ₹{item.amount} — <span className={item.matched ? 'text-success' : 'text-error'}>{item.matched ? 'Matched' : 'Unmatched'}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
