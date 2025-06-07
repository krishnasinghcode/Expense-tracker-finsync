import mongoose from 'mongoose';

const preferenceSchema = new mongoose.Schema({
  theme: { type: String, default: 'light' },
  currency: { type: String, default: 'INR' },
  defaultView: { type: String, enum: ['day', 'week', 'month'], default: 'month' },
  language: { type: String, default: 'en' }, // ISO code like 'en', 'hi'
  defaultIncomeCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  defaultExpenseCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  notificationSettings: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    push: { type: Boolean, default: false }
  }
}, { _id: false });


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },

  provider: { type: String, default: 'local' },
  googleId: { type: String, default: null },
  googleAccessToken: { type: String, default: null },
  googleRefreshToken: { type: String, default: null },

  verifyOtp: { type: String, default: '' },
  verifyOtpExpireAt: { type: Date, default: Date.now },
  isAccountVerified: { type: Boolean, default: false },

  resetOtp: { type: String, default: '' },
  resetOtpExpireAt: { type: Date, default: Date.now },
  isResetVerified: { type: Boolean, default: false },

  avatar: { type: String, default: null },

  preferences: preferenceSchema
}, { timestamps: true });

export default mongoose.model('User', userSchema);
