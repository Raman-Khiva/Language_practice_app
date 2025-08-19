// Question routes: CRUD, retrieval and completion tracking helpers
import express from "express";
import Question from "../models/questionModel.js";
import Category from "../models/categoryModel.js";
import { protect } from "../middleswares/auth.js";
import UserProgress from "../models/userProgressModel.js";

const router = express.Router();

// @desc    Add a new question
// @route   POST /api/questions/add
// @access  Public (consider protecting in the future)
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


// @desc    Get questions by category (?category=...)
// @route   GET /api/questions?category=<name>
// @access  Public
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

// @desc    Mark a specific question as completed by the user
// @route   POST /api/questions/:questionId/complete
// @access  Private (Bearer token)
router.post("/:questionId/complete", protect, async (req, res) => {
    try {
        const { questionId } = req.params;

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }

        const updated = await UserProgress.findOneAndUpdate(
            { userId: req.user._id },
            {
                $setOnInsert: { userId: req.user._id, completedQuestions: [] },
                $addToSet: { completedQuestions: question._id }
            },
            { new: true, upsert: true }
        );

        return res.json({
            success: true,
            message: "Question marked as completed",
            data: {
                questionId: question._id,
                questionsCompleted: updated.completedQuestions.length
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error while marking question completed" });
    }
});

// @desc    Get unanswered questions for the user (optional ?category=...)
// @route   GET /api/questions/unanswered?category=<name>
// @access  Private (Bearer token)
router.get("/unanswered", protect, async (req, res) => {
    try {
        const category = req.query.category;

        // Get completed question IDs for the user
        const progress = await UserProgress.findOne(
            { userId: req.user._id },
            { completedQuestions: 1 }
        );
        const completedIds = progress ? progress.completedQuestions : [];

        const query = {};
        if (category) {
            query.categories = category;
        }
        if (completedIds.length > 0) {
            query._id = { $nin: completedIds };
        }

        const questions = await Question.find(query);
        return res.json(questions);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error while fetching unanswered questions" });
    }
});