import express from 'express';
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction
} from '../controllers/transactionController.js';
import {authenticateUser} from '../middleware/authorisation.js';

const router = express.Router();

/**
 * @route   POST /api/transaction
 * @desc    Create a new transaction (income or expense)
 * @access  Private
 */
router.post('/', authenticateUser, createTransaction);

/**
 * @route   GET /api/transaction
 * @desc    Get all transactions with optional filters (date, category)
 * @access  Private
 */
router.get('/', authenticateUser, getTransactions);

/**
 * @route   GET /api/transaction/:id
 * @desc    Get transaction details by ID
 * @access  Private
 */
router.get('/:id', authenticateUser, getTransactionById);

/**
 * @route   PUT /api/transaction/:id
 * @desc    Update transaction by ID
 * @access  Private
 */
router.put('/:id', authenticateUser, updateTransaction);

/**
 * @route   DELETE /api/transaction/:id
 * @desc    Delete transaction by ID
 * @access  Private
 */
router.delete('/:id', authenticateUser, deleteTransaction);

export default router;
