import express from "express";
import Category from "../models/categoryModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
        console.log("Categories requested by client !");
    try {
        const categories = await Category.find({});
        console.log("List fetched! converting to object for client");
        const categoryArray = categories.map((obj)=>({
            name : obj.category,
            count : obj.count
        }))
        
        console.log("Converted categories to array and sent! This is object", categoryArray);
        res.status(200).json(categoryArray);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error while fetching categories" });
    }
});




export default router;