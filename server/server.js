
// Core app and dependencies 
import express from "express";
import mongoose from "mongoose";
// Route modules
import categoreyRoutes from "./routes/category.js";
import translationRoutes from "./routes/translation.js";
import authRoutes from "./routes/auth.js";
import progressRoutes from "./routes/userProgress.js";
import dotenv from 'dotenv';
import cors from 'cors';
import lessonRouter from "./routes/lessonRoutes.js";

// Load environment variables
dotenv.config();


const app = express();

// Guard: required environment variables
if (!process.env.JWT_SECRET) {
    
    process.exit(1);
}

// Global middleware
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI )
  .then()
  .catch(err=> { console.log("Error connecting to MongoDB! Error : ",err); });



// Route map
// Auth & Users      → /api/auth
// Categories        → /api/categories
// Translation       → /api/translation
// User Progress     → /api/progress
app.use("/api/categories",categoreyRoutes);
app.use("/api/translation", translationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/lessons", lessonRouter);

app.listen(PORT, ()=>{
    console.log(`server stated successfully and is listening at ${PORT}`);
});
