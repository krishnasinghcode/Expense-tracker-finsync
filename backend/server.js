import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js'; // Import the database connection

// routes imported
import authRoutes from './routes/authRoutes.js';
import alertRoutes from './routes/alertRoutes.js';
import bankstatementRoutes from './routes/bankstatementRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from "cookie-parser";


dotenv.config(); // Load environment variables from .env file
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
app.use(cookieParser());
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to handle CORS
const allowedOrigins = [
  'http://localhost:5173',  // Vite dev server default
  'http://localhost:3000',  // Your backend or other allowed origins
  // add other allowed domains here
]
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error("Not allowed by CORS")); // Block the request
        }
    },
    credentials: true // Allows cookies/auth headers
}));

// routes

app.use('/api/auth', authRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/bankstatement',bankstatementRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/user', userRoutes);


const startServer = async () => {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();
