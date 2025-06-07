// routes/reportRoutes.js
import express from 'express';
import {
  getSummaryReport,
  getCategoryBreakdown,
  getTrendsReport,
  getRecurringTransactions,
  getBankMatchReport,
  getBudgetComparison,
  exportReport
} from '../controllers/reportController.js';

import { authenticateUser } from '../middleware/authorisation.js';

const router = express.Router();

router.use(authenticateUser);

router.get('/summary', getSummaryReport);
router.get('/category-breakdown', getCategoryBreakdown);
router.get('/trends', getTrendsReport);
router.get('/recurring', getRecurringTransactions);
router.get('/bank-matches', getBankMatchReport);
router.get('/budget-compare', getBudgetComparison);
router.get('/export', exportReport);

export default router;

