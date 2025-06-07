import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authenticateUser = async (req, res, next) => {
  try {
    // 1. Check if authenticated via Passport session
    if (req.isAuthenticated && req.isAuthenticated()) {
      return next(); // User is authenticated via OAuth session
    }

    // 2. Fallback to JWT token in cookie
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(`Authentication error: ${err.message}`);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export const authenticateAdmin = async (req, res, next) => {
  try {
    // 1. Check if authenticated via Passport session
    if (req.isAuthenticated && req.isAuthenticated()) {
      if (req.user.role === 'admin') {
        return next(); // User is authenticated and is an admin
      } else {
        return res.status(403).json({ message: "Access Denied: Admins only" });
      }
    }

    // 2. Fallback to JWT token in cookie
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: "Access Denied: Admins only" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(`Admin authentication error: ${err.message}`);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}