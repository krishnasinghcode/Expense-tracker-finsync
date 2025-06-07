import mongoose from 'mongoose';

const parsedEntrySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  matched: { type: Boolean, default: false },
  linkedTransactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', default: null }
}, { _id: false });

const bankStatementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  originalFileName: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  transactions: [parsedEntrySchema]
}, { timestamps: true });

export default mongoose.model('BankStatement', bankStatementSchema);