import React, { useEffect, useState } from 'react';
import { getTransactions, deleteTransaction } from '../api/transaction';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const res = await getTransactions();
      if (Array.isArray(res.data)) {
        setTransactions(res.data);
      } else {
        console.error('Invalid data format:', res.data);
        setTransactions([]);
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) return <div className="text-center text-lg">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Transactions</h2>

      {transactions.length === 0 ? (
        <div className="text-center text-gray-500">No transactions found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-base-200 text-base-content">
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id}>
                  <td>
                    <span className={`badge ${tx.type === 'income' ? 'badge-success' : 'badge-error'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td>{tx.categoryId?.name || 'N/A'}</td>
                  <td>₹{tx.amount}</td>
                  <td>{new Date(tx.date).toLocaleDateString()}</td>
                  <td>{tx.note || '-'}</td>
                  <td className="space-x-2">
                    <button className="btn btn-sm btn-warning">
                      <FaEdit />
                    </button>
                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(tx._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
