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
    type: [],
    default: []
  },

// Daily activity stats
  dailyCount: {
    type: [
    ],
    default: []
  },

  // Lessons completed

  lessonsList: {
    type: [
      { 
        lessonId : { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
        solved : {type : Number}
      }

    ],
    default: [] // ✅
  }
});

// Check if model exists before creating it
export default mongoose.models.UserProgress || mongoose.model("UserProgress", userProgressSchema);
