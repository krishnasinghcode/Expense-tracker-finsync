import express from 'express';
import {
  signup,
  login,
  logout,
  sendVerificationOTP,
  verifyOTP,
  sendResetOTP,
  verifyResetOTP,
  resetPassword,
  getCurrentUser
} from '../controllers/authController.js';

const router = express.Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post('/signup', signup);

/**
 * @route   POST /api/auth/login
 * @desc    Login user and issue token
 * @access  Public
 */
router.post('/login', login);

/**
 * @route   GET /api/auth/logout
 * @desc    Logout user and clear session/token
 * @access  Private (needs auth middleware, to be added)
 */
router.get('/logout', logout);

/**
 * @route   POST /api/auth/send-verification-otp
 * @desc    Send OTP for email verification
 * @access  Public
 */
router.post('/send-verification-otp', sendVerificationOTP);

/**
 * @route   POST /api/auth/verify-otp
 * @desc    Verify email OTP
 * @access  Public
 */
router.post('/verify-otp', verifyOTP);

/**
 * @route   POST /api/auth/send-reset-otp
 * @desc    Send OTP for password reset
 * @access  Public
 */
router.post('/send-reset-otp', sendResetOTP);

/**
 * @route   POST /api/auth/verify-reset-otp
 * @desc    Verify OTP for password reset
 * @access  Public
 */
router.post('/verify-reset-otp', verifyResetOTP);

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset user password after OTP verification
 * @access  Public
 */
router.post('/reset-password', resetPassword);

/**
 * @route   GET /api/auth/me
 * @desc    Get current authenticated user
 * @access  Private (checks cookie JWT)
 */
router.get('/me', getCurrentUser);


export default router;
