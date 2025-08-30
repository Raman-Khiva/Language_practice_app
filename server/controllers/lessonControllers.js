
import Lesson  from '../models/lessonModel.js';




export const getLessonsByDifficulty = async (req, res) => {
    
    try {
        const { difficulty } = req.params;
        const lessons = await Lesson.find({ difficulty: Number(difficulty) });
        res.status(200).json({ success: true, data: lessons });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const getLessonsByDifficultyAndCategory = async (req, res) => {
    try{
        const {difficulty, category} = req.params;
        const lessons = await Lesson.find({ difficulty: Number(difficulty), category });
        res.status(200).json({ success: true, data: lessons });
    }
    catch(error){
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}


export const addManyLessons = async (req, res) => {
    console.log('ADD MANY LESSONS : request recived!');
    try{
        console.log('ADD MANY LESSONS : request recived!');
        const lessonslist = req.body; // Expecting an array of lesson objects
        console.log('ADD MANY LESSONS : Lessons to be added : ', lessonslist);
        const insertedLessons = await Lesson.insertMany(lessonslist);
        console.log('ADD MANY LESSONS : Lessons added successfully!');
        res.status(201).json({ success: true, data: insertedLessons });
    }
    catch(error){
        console.error('ADD MANY LESSONS : Error adding lessons:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}