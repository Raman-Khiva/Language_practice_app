import mongoose from "mongoose";

const lessonsProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
        required: true
    },
    bestScore: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    totalSuccAttempts: {
        type: Number,
        default: 0,
        min: 0
    }
 
});

// Compound index to ensure one progress entry per user-lesson combination
lessonsProgressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });

export default mongoose.model("LessonsProgress", lessonsProgressSchema);
