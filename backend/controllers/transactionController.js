import Transaction from '../models/transactionModel.js';

/**
 * @desc    Create a new transaction
 * @route   POST /api/transaction
 * @access  Private
 */
export const createTransaction = async (req, res) => {
  const userId = req.user?._id;
  const { type, categoryId, amount, date, note, source } = req.body;

const missingFields = [];
if (!type) missingFields.push('type');
if (!categoryId) missingFields.push('categoryId');
if (!amount) missingFields.push('amount');
if (!date) missingFields.push('date');

if (missingFields.length > 0) {
  return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
}


  try {
    const transaction = new Transaction({
      userId,
      type,
      categoryId,
      amount,
      date,
      note,
      source: source || 'manual',
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    console.error('Create Transaction Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * @desc    Get all transactions with optional filters
 * @route   GET /api/transaction
 * @access  Private
 */
export const getTransactions = async (req, res) => {
  const userId = req.user?._id;
  const { categoryId, type, startDate, endDate } = req.query;

  const filter = { userId };
  if (categoryId) filter.categoryId = categoryId;
  if (type) filter.type = type;
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  try {
    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Get Transactions Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * @desc    Get single transaction by ID
 * @route   GET /api/transaction/:id
 * @access  Private
 */
export const getTransactionById = async (req, res) => {
  const userId = req.user?._id;
  const { id } = req.params;

  try {
    const transaction = await Transaction.findOne({ _id: id, userId });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    console.error('Get Transaction By ID Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * @desc    Update transaction by ID
 * @route   PUT /api/transaction/:id
 * @access  Private
 */
export const updateTransaction = async (req, res) => {
  const userId = req.user?._id;
  const { id } = req.params;
  const updates = req.body;

  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, userId },
      { $set: updates },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error('Update Transaction Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * @desc    Delete transaction by ID
 * @route   DELETE /api/transaction/:id
 * @access  Private
 */
export const deleteTransaction = async (req, res) => {
  const userId = req.user?._id;
  const { id } = req.params;

  try {
    const transaction = await Transaction.findOneAndDelete({ _id: id, userId });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Delete Transaction Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
