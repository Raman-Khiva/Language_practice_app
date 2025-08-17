import express from "express";
import Category from "../models/categoryModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
        console.log("Categories requested by client !");
    try {
        const categories = await Category.find({});
        console.log("List fetched! converting to object for client");
        const categoryObject = {};
        categories.forEach(obj => {
            categoryObject[obj.category] = obj.count;
        });
        console.log("Converted categories to object and sent! This is object", categoryObject);
        res.status(200).json(categoryObject);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error while fetching categories" });
    }
});




export default router;