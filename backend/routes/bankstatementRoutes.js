import express from 'express';
import {
  uploadBankStatement,
  checkBankMatches
} from '../controllers/bankStatementController.js';

const router = express.Router();

/**
 * @route   POST /api/bankstatement/upload
 * @desc    Upload and parse bank statement file
 * @access  Private
 */
router.post('/upload', uploadBankStatement);

/**
 * @route   GET /api/bankstatement/matches
 * @desc    Compare bank statement entries with user's transactions
 * @access  Private
 */
router.get('/matches', checkBankMatches);

export default router;
