import router from 'express';
import express from 'express';
import { Lesson } from '../models/models.js';


const lessonRouter = express.Router();



const getLessonsByDifficulty = async (req, res) => {
    
    try {
        const { difficulty } = req.params;
        const lessons = await Lesson.find({ difficulty: Number(difficulty) });
        res.status(200).json({ success: true, data: lessons });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

const getLessonsByDifficultyAndCategory = async (req, res) => {
    try{
        const {difficulty, category} = req.params;
        const lessons = await Lesson.find({ difficulty: Number(difficulty), category });
        res.status(200).json({ success: true, data: lessons });
    }
    catch(error){
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}
