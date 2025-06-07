// controllers/reportController.js
import Transaction from '../models/transactionModel.js';
import BankStatement from '../models/bankStatementModel.js';
import Category from '../models/categoryModel.js';
import mongoose from 'mongoose';

export const getSummaryReport = async (req, res) => {
  const userId = req.user._id;
  const { startDate, endDate } = req.query;

  const filter = { userId };
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  try {
    const income = await Transaction.aggregate([
      { $match: { ...filter, type: 'income' } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const expense = await Transaction.aggregate([
      { $match: { ...filter, type: 'expense' } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    res.json({
      totalIncome: income[0]?.total || 0,
      totalExpense: expense[0]?.total || 0,
      net: (income[0]?.total || 0) - (expense[0]?.total || 0)
    });
  } catch (err) {
    res.status(500).json({ message: 'Summary report error', error: err.message });
  }
};

export const getCategoryBreakdown = async (req, res) => {
  const userId = req.user._id;
  const { type, startDate, endDate } = req.query;

  const filter = { userId };
  if (type) filter.type = type;
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  try {
    const data = await Transaction.aggregate([
      { $match: filter },
      { $group: {
        _id: "$categoryId",
        total: { $sum: "$amount" }
      } },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: "$category"
      },
      {
        $project: {
          _id: 0,
          category: "$category.name",
          total: 1
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Breakdown error', error: err.message });
  }
};

export const getTrendsReport = async (req, res) => {
  const userId = req.user._id;
  const { type, interval = 'monthly', startDate, endDate } = req.query;

  const dateFormat = interval === 'daily' ? '%Y-%m-%d' : interval === 'weekly' ? '%Y-%U' : '%Y-%m';
  const filter = { userId };
  if (type) filter.type = type;
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  try {
    const data = await Transaction.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            $dateToString: {
              format: dateFormat,
              date: "$date"
            }
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Trend report error', error: err.message });
  }
};

export const getRecurringTransactions = async (req, res) => {
  const userId = req.user._id;

  try {
    const data = await Transaction.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: { amount: "$amount", categoryId: "$categoryId" },
          count: { $sum: 1 },
          examples: { $push: "$note" }
        }
      },
      { $match: { count: { $gte: 3 } } }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Recurring detection error', error: err.message });
  }
};

export const getBankMatchReport = async (req, res) => {
  const userId = req.user._id;
  const { status } = req.query; // matched / unmatched

  try {
    const statements = await BankStatement.find({ userId });
    let allEntries = statements.flatMap(s => s.transactions.map(t => ({ ...t.toObject(), fileId: s._id })));

    if (status === 'matched') {
      allEntries = allEntries.filter(e => e.matched);
    } else if (status === 'unmatched') {
      allEntries = allEntries.filter(e => !e.matched);
    }

    res.json(allEntries);
  } catch (err) {
    res.status(500).json({ message: 'Bank match error', error: err.message });
  }
};

export const getBudgetComparison = async (req, res) => {
  // Placeholder, assumes you have a Budget model later
  res.status(501).json({ message: 'Budget comparison not implemented yet' });
};

export const exportReport = async (req, res) => {
  const { format = 'csv', reportType } = req.query;

  // Placeholder: export logic to CSV/PDF depending on reportType
  res.status(501).json({ message: 'Export functionality not implemented yet' });
};
