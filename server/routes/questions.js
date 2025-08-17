import express from "express";
import Question from "../models/questionModel.js";
import Category from "../models/categoryModel.js";

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


router.get("/", async (req,res) => {

    console.log("User asked for category questions ! Will check if category is valid");

    try{
        const curCategory = req.query.category;

        const allCategories = await Category.find({});

        if (!allCategories.some(obj => obj.category === curCategory)) {
            console.error("User asked for INVALID CATEGORY! error(400) sent to user! , category asked for this category --->", curCategory);
            return res.status(400).json({ error: "Invalid category" });
        }

        console.log("Category is valid, proceeding to fetch questions for category");


        console.log(`Fetching questions for category: ${curCategory}`);
    
        const curData = await Question.find({categories : curCategory});

        console.log("Data fetched:");

        console.log("Data has been sent to user");

        res.status(200).json(curData);

    }catch(err){
        console.error("Server error while fetching questions:", err);
        res.status(500).json({ error: "Server error while fetching questions" });
    }


    
})

export default router;