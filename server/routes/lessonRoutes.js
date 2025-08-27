import express from "express";
import { Router } from "express";
import { getLessonsByDifficulty, getLessonsByDifficultyAndCategory } from "../controllers/lessonControllers.js";


const lessonRouter = express.Router();
lessonRouter.get('/difficulty/:difficulty', getLessonsByDifficulty);
lessonRouter.get('/difficulty/:difficulty/category/:category', getLessonsByDifficultyAndCategory);


