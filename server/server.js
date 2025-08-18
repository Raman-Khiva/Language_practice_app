
import express from "express";
import mongoose from "mongoose";
import questionRoutes from "./routes/questions.js";
import categoreyRoutes from "./routes/category.js";
import translationRoutes from "./routes/translation.js";
import dotenv from 'dotenv';
import 'dotenv/config';
import cors from 'cors';
dotenv.config({quiet : true});


const app = express();

app.use(cors());
const PORT = 5000;

app.use(express.json());


// connect to data base
mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log("MongoDB connected"))
  .catch(err=> console.error(err));



app.use("/api/questions",questionRoutes);
app.use("/api/categories",categoreyRoutes);
app.use("/api/translation", translationRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
