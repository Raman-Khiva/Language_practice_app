import express from "express";
import { addManyLessons, getLessons } from "../controllers/lessonControllers.js";


const lessonRouter = express.Router();
lessonRouter.get('/',getLessons);
lessonRouter.post('/addMany', addManyLessons);


export default lessonRouter;

