
import categoryModel from '../models/categoryModel.js';
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
        res.status(200).json({ success: true, lessons: lessons });
    }
    catch(error){
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const getLessons = async (req,res) => {
    try{
        console.log("GET_LESSONS : Request recieved");
        const {difficulty,category} = req.query;
        const filter = {};
        if(difficulty) filter.difficulty = Number(difficulty);
        if(category) filter.category = category;

        console.log("GET_LESSONS : filter -",filter);

        const lessons = await Lesson.find(filter);
        res.status(200).json({success:true, lessons: lessons});


    }catch(error){
        return res.status(500).json({success:false, message : 'Server Error', error: error});
    }
}





export const addManyLessons = async (req, res) => {
    console.log('ADD MANY LESSONS : request received!');
    try {
        const lessonslist = req.body; // Expecting an array of lesson objects
        console.log('ADD MANY LESSONS : Lessons to be added : ', lessonslist);
        
        // Insert lessons
        const insertedLessons = await Lesson.insertMany(lessonslist);
        console.log('ADD MANY LESSONS : Lessons added successfully!');
        
        // Count lessons by category
        const categoryCounts = {};
        lessonslist.forEach(lesson => {
            if (lesson.category) {
                categoryCounts[lesson.category] = (categoryCounts[lesson.category] || 0) + 1;
            }
        });
        
        console.log('ADD MANY LESSONS : Category counts to update:', categoryCounts);
        
        // Update category counts
        const categoryUpdatePromises = Object.entries(categoryCounts).map(async ([categoryName, count]) => {
            return categoryModel.findOneAndUpdate(
                { category: categoryName },
                { 
                    $inc: { count: count },
                    $setOnInsert: { category: categoryName } // Set category name if creating new document
                },
                { 
                    upsert: true, // Create if doesn't exist
                    new: true 
                }
            );
        });
        
        // Execute all category updates
        await Promise.all(categoryUpdatePromises);
        console.log('ADD MANY LESSONS : Category counts updated successfully!');
        
        res.status(201).json({ success: true, data: insertedLessons });
    }
    catch(error) {
        console.error('ADD MANY LESSONS : Error adding lessons:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}