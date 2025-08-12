import express from "express";
import Question from "../models/questionModel.js";

const router = express.Router();

router.post("/add", async (req,res)=>{
    try{
        const {english,spanish,categories,explanation,difficulty} = req.body;

    if(!english || !spanish || !categories){
        return res.status(400).json({error : "english, spanish, and categories are required"});
    }

    const newQuestion = new Question({
        english,
        spanish,
        categories,
        explanation,
        difficulty
    });
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
    }catch(err){
        console.error(err);
        res.status(500).json({error : "Server error while adding question"});
    }
});

export default router;