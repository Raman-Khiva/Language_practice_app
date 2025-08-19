import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    english : {
        type : String,
        required : true,
        trim : true
    },
    spanish :{
        type : [String],
        required : true,
    },
    categories : {
        type : [String],
        required : true,
        index : true,
    },
    explanation :{
        type : String,
        default : "",
    },
    difficulty : {
        type: Number,
        min : 1,
        max : 5,
        default : 3,       
    },
    createdAt : {
        type: Date,
        default : Date.now,
    }
});

export default mongoose.model("Question",questionSchema);