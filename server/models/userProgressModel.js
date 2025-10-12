import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true, 
    unique: true 
  },

  categoryStats: {
    type: [],       
    default: []       
  },

  dailyCount: {
    type: [], 
    default: []
  },
});


export default mongoose.models.UserProgress || mongoose.model("UserProgress", userProgressSchema);
