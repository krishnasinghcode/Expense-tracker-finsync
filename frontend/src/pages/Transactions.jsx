import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddTransactionForm from '../components/AddTransactionForm';
import Button from '../components/Button';
import { getTransactions, deleteTransaction } from '../api/transaction';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchTransactions = async () => {
    try {
      const res = await getTransactions();
      setTransactions(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Your Transactions</h2>
        <Button text="Add Expense" variant="primary" onClick={() => setShowModal(true)} />
      </div>

      {/* Modal */}
      {showModal && (
         <div className="fixed inset-0 z-50 bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Transaction</h3>
              <button className="btn btn-sm btn-circle" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <AddTransactionForm
              onSuccess={() => {
                fetchTransactions();
                setShowModal(false);
              }}
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : transactions.length === 0 ? (
        <div className="text-center text-gray-500">No transactions found.</div>
      ) : (
        <div className="overflow-x-auto mt-4">
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
