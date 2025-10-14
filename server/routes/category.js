import express from "express";
import Category from "../models/categoryModel.js";
import Lessons from '../models/lessonModel.js' 
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const categories = await Category.find({});
        const categoryArray = categories.map((obj)=>({
            name : obj.category,
            count : obj.count
        }));
        res.status(200).json(categoryArray);
    } catch (err) {
        res.status(500).json({ error: "Server error while fetching categories" });
    }
});


router.get("/get&set",async(req,res)=>{
    try{
        const lessons = await Lessons.find({});
        const count = lessons.reduce((acc,lesson)=>{
            acc[lesson.category] = (acc[lesson.category] || 0) + 1;
            return acc;
        },{});

        const categoriesList = Object.entries(count).map(([key,value])=>({
            category : key,
            count : value
        }));

        const insertedCategories = await Category.insertMany(categoriesList);
        res.status(200).json({
            message : "Categories fetched and set successfully.",
            insertedCategories : insertedCategories,
        })
        

    }catch(err){
        res.status(500).json({error: `Error while getting and setting categories , error = ${err} `})
    }
})


export default router;