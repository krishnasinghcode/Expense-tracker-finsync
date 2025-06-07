// controllers/categoryController.js

import Category from "../models/categoryModel.js";

// GET all categories (default + user-defined)
export const getCategories = async (req, res) => {
  try {
    const userId = req.user?._id;

    const categories = await Category.find({
      $or: [
        { isDefault: true },                  // Default categories (available to all)
        { userId: userId }                    // User's own categories
      ]
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to retrieve categories" });
  }
};

// POST create a new category
export const createCategory = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { type, name, color, icon } = req.body;

    const newCategory = new Category({
      userId,
      type,
      name,
      color,
      icon,
      isDefault: false // Only admins can create default categories
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Failed to create category" });
  }
};

// PUT update a category by ID
export const updateCategory = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;
    const { name, color, icon, type } = req.body;

    const category = await Category.findOne({ _id: id });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Ensure only user-created categories can be updated
    if (category.isDefault || String(category.userId) !== String(userId)) {
      return res.status(403).json({ message: "Unauthorized to update this category" });
    }

    // Update fields with validation
    category.name = name || category.name;
    category.color = color || category.color;
    category.icon = icon || category.icon;
    
    if (type && ['expense', 'income'].includes(type)) {
      category.type = type;
    }

    const updated = await category.save();
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Failed to update category" });
  }
};

// DELETE category by ID
export const deleteCategory = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    const category = await Category.findOne({ _id: id });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Prevent deletion of default categories
    if (category.isDefault || String(category.userId) !== String(userId)) {
      return res.status(403).json({ message: "Unauthorized to delete this category" });
    }

    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
};
