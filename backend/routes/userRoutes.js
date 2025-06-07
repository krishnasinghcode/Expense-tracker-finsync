import express from 'express';
import {
  getUserProfile,
  updateUserPreferences
} from '../controllers/userController.js';

const router = express.Router();

/**
 * @route   GET /api/user/profile
 * @desc    Get logged-in user's profile info
 * @access  Private
 */
router.get('/profile', getUserProfile);

/**
 * @route   PUT /api/user/preferences
 * @desc    Update user preferences (theme, default categories, etc.)
 * @access  Private
 */
router.put('/preferences', updateUserPreferences);

export default router;
