
import express from "express";
import mongoose from "mongoose";
import questionRoutes from "./routes/questions.js";
import dotenv from 'dotenv';
dotenv.config({quiet : true});


const app = express();
const PORT = 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log("MongoDB connected"))
  .catch(err=> console.error(err));



app.use("/api/questions",questionRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
