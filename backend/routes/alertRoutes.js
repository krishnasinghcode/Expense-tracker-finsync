import express from 'express';
import { getAlerts } from '../controllers/alertController.js';

const router = express.Router();

/**
 * @route   GET /api/alerts
 * @desc    Retrieve all system alerts like mismatches or unfinished entries
 * @access  Private
 */
router.get('/', getAlerts);

export default router;
