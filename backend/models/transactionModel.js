import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  note: { type: String },
  source: { type: String, enum: ['manual', 'bank_matched'], default: 'manual' },
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);