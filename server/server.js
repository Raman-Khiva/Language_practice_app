
import express from "express";
import mongoose from "mongoose";
import questionRoutes from "./routes/questions.js";
import categoreyRoutes from "./routes/category.js";
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config({quiet : true});


const app = express();

app.use(cors());
const PORT = 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log("MongoDB connected"))
  .catch(err=> console.error(err));



app.use("/api/questions",questionRoutes);
app.use("/api/categories",categoreyRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
