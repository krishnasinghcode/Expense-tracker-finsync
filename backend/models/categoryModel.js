import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  type: { type: String, enum: ['income', 'expense'], required: true },
  name: { type: String, required: true },
  color: { type: String },
  icon: { type: String },
  isDefault: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);