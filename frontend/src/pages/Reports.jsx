import { useState, useEffect } from 'react';
import {
  fetchSummary,
  fetchCategoryBreakdown,
  fetchTrends,
  fetchRecurring,
  fetchBankMatch
} from '../api/report';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2'];

export default function Report() {
  // Filters
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState(''); // income, expense, or empty = all
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data states
  const [summary, setSummary] = useState(null);
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [trends, setTrends] = useState([]);
  const [recurring, setRecurring] = useState([]);
  const [bankMatches, setBankMatches] = useState([]);

  // Fetch data from API with filters
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
        fetchBankMatch({})
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

  if (loading) return <p className="p-4 text-center">Loading reports...</p>;
  if (error) return <p className="p-4 text-center text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Financial Reports</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <label className="flex flex-col">
          Start Date
          <input
            type="date"
            className="border rounded px-3 py-1"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </label>

        <label className="flex flex-col">
          End Date
          <input
            type="date"
            className="border rounded px-3 py-1"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </label>

        <label className="flex flex-col">
          Type
          <select
            className="border rounded px-3 py-1"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <button
          onClick={loadData}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Refresh
        </button>
      </div>

      {/* Summary */}
      <section className="mb-8 bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-3">Summary</h2>
        <div className="flex justify-around text-center">
          <div>
            <p className="text-gray-500">Total Income</p>
            <p className="text-green-600 text-2xl font-bold">₹{summary?.totalIncome ?? 0}</p>
          </div>
          <div>
            <p className="text-gray-500">Total Expense</p>
            <p className="text-red-600 text-2xl font-bold">₹{summary?.totalExpense ?? 0}</p>
          </div>
          <div>
            <p className="text-gray-500">Net Savings</p>
            <p className={`text-2xl font-bold ${summary?.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₹{summary?.net ?? 0}
            </p>
          </div>
        </div>
      </section>

      {/* Category Breakdown */}
      <section className="mb-8 bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-3">Category Breakdown</h2>
        {categoryBreakdown.length === 0 ? (
          <p>No data available.</p>
        ) : (
          <PieChart width={400} height={300}>
            <Pie
              data={categoryBreakdown}
              dataKey="total"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {categoryBreakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${value}`} />
            <Legend />
          </PieChart>
        )}
      </section>

      {/* Trends */}
      <section className="mb-8 bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-3">Trends</h2>
        {trends.length === 0 ? (
          <p>No trend data available.</p>
        ) : (
          <LineChart
            width={600}
            height={300}
            data={trends}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value}`} />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        )}
      </section>

      {/* Recurring Transactions */}
      <section className="mb-8 bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-3">Recurring Transactions</h2>
        {recurring.length === 0 ? (
          <p>No recurring transactions found.</p>
        ) : (
          <ul className="list-disc pl-5 max-h-48 overflow-auto">
            {recurring.map((item, i) => (
              <li key={i}>
                Amount: ₹{item._id.amount}, Count: {item.count}, Notes: {item.examples.join(', ')}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Bank Match Report */}
      <section className="mb-8 bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-3">Bank Match Report</h2>
        {bankMatches.length === 0 ? (
          <p>No bank matched/unmatched transactions.</p>
        ) : (
          <ul className="list-disc pl-5 max-h-48 overflow-auto">
            {bankMatches.map((item, i) => (
              <li key={i}>
                {item.description || 'No description'} — ₹{item.amount} — {item.matched ? 'Matched' : 'Unmatched'}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
