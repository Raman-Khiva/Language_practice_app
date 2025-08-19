import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    completedQuestions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Ensure only one progress record per user
userProgressSchema.index({ userId: 1 }, { unique: true });

// Method to add a completed question
userProgressSchema.methods.addCompletedQuestion = function(questionId) {
    const questionObjectId = new mongoose.Types.ObjectId(questionId);
    const alreadyExists = this.completedQuestions.some(
        (id) => id.toString() === questionObjectId.toString()
    );
    if (alreadyExists) {
        return this;
    }
    this.completedQuestions.push(questionObjectId);
    return this.save();
};

// Virtual for question count
userProgressSchema.virtual('questionsCompleted').get(function() {
    return this.completedQuestions.length;
});

export default mongoose.model("UserProgress", userProgressSchema);
