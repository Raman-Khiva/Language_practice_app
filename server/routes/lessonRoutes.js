import express from "express";
import { addManyLessons, getAllLessons, getLessons, getLessonsWithCateAndDiff } from "../controllers/lessonControllers.js";


const lessonRouter = express.Router();
lessonRouter.get('/',getLessons);
lessonRouter.post('/addMany', addManyLessons);
lessonRouter.get('/getAllLessons',getAllLessons);
lessonRouter.get('/getLessonsWithCateAndDiff',getLessonsWithCateAndDiff);


export default lessonRouter;

