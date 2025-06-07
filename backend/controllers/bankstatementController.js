import BankStatement from '../models/bankStatementModel.js';
import Transaction from '../models/transactionModel.js';
// import file parser utility as needed (e.g., csv-parser, pdf-parse)

export const uploadBankStatement = async (req, res) => {
  try {
    const userId = req.user._id;

    // TODO: Add file parser logic here
    const parsedTransactions = [
      { date: new Date(), description: "XYZ", amount: 1000 },
      { date: new Date(), description: "ABC", amount: 500 }
    ];

    const newStatement = new BankStatement({
      userId,
      originalFileName: req.file?.originalname || 'uploaded.csv',
      transactions: parsedTransactions
    });

    await newStatement.save();
    res.status(201).json({ message: 'Bank statement uploaded', statementId: newStatement._id });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Failed to upload bank statement' });
  }
};

export const checkBankMatches = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Get the latest bank statement for user
    const latestStatement = await BankStatement.findOne({ userId }).sort({ uploadedAt: -1 });
    if (!latestStatement) return res.status(404).json({ message: 'No bank statement found' });

    const userTransactions = await Transaction.find({ userId });

    // 2. Match logic: amount and date (within ±1 day)
    latestStatement.transactions = latestStatement.transactions.map(entry => {
      const match = userTransactions.find(tx =>
        Math.abs(new Date(tx.date) - new Date(entry.date)) <= 86400000 && // ±1 day
        tx.amount === entry.amount
      );

      if (match) {
        return {
          ...entry.toObject(),
          matched: true,
          linkedTransactionId: match._id
        };
      }

      return entry;
    });

    await latestStatement.save();

    res.status(200).json({
      message: 'Matching completed',
      matched: latestStatement.transactions.filter(e => e.matched).length,
      total: latestStatement.transactions.length
    });
  } catch (error) {
    console.error('Match Error:', error);
    res.status(500).json({ message: 'Failed to match transactions' });
  }
};
