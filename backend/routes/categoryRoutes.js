import express from 'express';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';

import { authenticateUser } from '../middleware/authorisation.js';

const router = express.Router();

/**
 * @route   GET /api/categories
 * @desc    Get all categories (default and user-defined)
 * @access  Private
 */
router.get('/', authenticateUser, getCategories);

/**
 * @route   POST /api/categories
 * @desc    Create a new category
 * @access  Private
 */
router.post('/', authenticateUser, createCategory);

/**
 * @route   PUT /api/categories/:id
 * @desc    Update a category by ID
 * @access  Private
 */
router.put('/:id', authenticateUser, updateCategory);

/**
 * @route   DELETE /api/categories/:id
 * @desc    Delete a category by ID
 * @access  Private
 */
router.delete('/:id', authenticateUser, deleteCategory);

export default router;
