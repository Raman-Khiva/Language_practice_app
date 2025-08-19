
// Core app and dependencies
import express from "express";
import mongoose from "mongoose";
// Route modules
import questionRoutes from "./routes/questions.js";
import categoreyRoutes from "./routes/category.js";
import translationRoutes from "./routes/translation.js";
import authRoutes from "./routes/auth.js";
import progressRoutes from "./routes/userProgress.js";
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();


const app = express();

// Guard: required environment variables
if (!process.env.JWT_SECRET) {
    console.error('ERROR: JWT_SECRET environment variable is not set!');
    console.error('Please create a .env file with JWT_SECRET=your_secret_key');
    process.exit(1);
}

// Global middleware
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI)
  .then(()=> console.log("MongoDB connected"))
  .catch(err=> console.error(err));



// Route map
// Auth & Users      → /api/auth
// Questions         → /api/questions
// Categories        → /api/categories
// Translation       → /api/translation
// User Progress     → /api/progress
app.use("/api/questions",questionRoutes);
app.use("/api/categories",categoreyRoutes);
app.use("/api/translation", translationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
