import express from "express";
import { getLessonsByDifficulty, getLessonsByDifficultyAndCategory, addManyLessons, getLessons } from "../controllers/lessonControllers.js";


const lessonRouter = express.Router();
lessonRouter.get('/difficulty/:difficulty', getLessonsByDifficulty);
lessonRouter.get('/difficulty/:difficulty/category/:category', getLessonsByDifficultyAndCategory);
lessonRouter.get('/',getLessons);
lessonRouter.post('/addMany', addManyLessons);


export default lessonRouter;

