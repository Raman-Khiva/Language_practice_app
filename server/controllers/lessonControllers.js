
import categoryModel from '../models/categoryModel.js';
import Lesson  from '../models/lessonModel.js';

export const getAllLessons = async (req,res) => {
    try{
        const lessons = await Lesson.find();
        res.status(200).json({success:true, lessons: lessons});
    }catch(error){
        return res.status(500).json({success:false, message : 'Server Error', error: error});
    }
}

export const getLessonsWithCateAndDiff = async (req,res) => {
    try{
    const { category, difficulty } = req.query;

    // Parse query params into arrays
    const categories = category ? category.split(",") : [];
    const difficulties = difficulty ? difficulty.split(",").map(Number) : [];

    const filter = {};

    // Apply filters conditionally
    if (categories.length > 0 ) {
      filter.category = { $in: categories };
    }

    if (difficulties.length > 0 && !difficulties.includes(-1)) {
      filter.difficulty = { $in: difficulties };
    }

    const lessons = await Lesson.find(filter);

    res.status(200).json({success:true, lessons:lessons});
  } catch (err) {
    res.status(500).json({success:false, error: "Failed to fetch problems" });
  }
}

export const getLessons = async (req,res) => {
    try{
        const {difficulty,category} = req.query;
        let difficultyInt = Number(difficulty);
        difficultyInt+=1;

        if(difficultyInt<1 || difficultyInt>12){
            res.status(500).json({
                success : false,
                error : "Invalid difficulty"
            })
        };
        const filter = {};
        if(difficulty) filter.difficulty = difficultyInt;
        if(category) filter.category = category;
        
        const lessons = await Lesson.find(filter);
        res.status(200).json({success:true, lessons: lessons});
    }catch(error){
        return res.status(500).json({success:false, message : 'Server Error', error: error});
    }
}

export const addManyLessons = async (req, res) => {
    try {
        const lessonslist = req.body; // Expecting an array of lesson objects
        
        // Insert lessons
        const insertedLessons = await Lesson.insertMany(lessonslist);
        
        // Count lessons by category
        const categoryCounts = {};
        lessonslist.forEach(lesson => {
            if (lesson.category) {
                categoryCounts[lesson.category] = (categoryCounts[lesson.category] || 0) + 1;
            }
        });
        
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
        
        res.status(201).json({ success: true, data: insertedLessons });
    }
    catch(error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}