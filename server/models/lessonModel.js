import mongoose from 'mongoose';




const lessonSchema = new mongoose.Schema({

    category : String,
    questions : [String],
    rank : Number,
    difficulty : Number,
});


export default mongoose.model('Lesson', lessonSchema);