import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true, 
    unique: true 
  },

  // Total category counts
  totalCount: {
    type: [],         // {category : categoryName, difficulty : [0,0,3,0,1,0,......]} 
    default: []       // {category : otherCateogry , difficulty: [0,0,0....]}
  },

// Daily activity stats
  dailyCount: {
    type: [], // {date : 4sep2025 , count:5} max7
    default: []
  },

  // Lessons completed

  lessonsList: {
    type: [
      { 
        lessonId : { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },   // {lessonId : , solved : 6}
        solved : {type : Number}  
      }

    ],
    default: [] // ✅
  }
});

// Check if model exists before creating it
export default mongoose.models.UserProgress || mongoose.model("UserProgress", userProgressSchema);
