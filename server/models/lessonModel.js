import mongoose from 'mongoose';
import { Schema } from 'mongoose';



const lessonSchema = new Schema({

    category : String,
    questions : [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    rank : Number,
    difficulty : Number
});
export default mongoose.models.Lesson || mongoose.model('Lesson', lessonSchema);