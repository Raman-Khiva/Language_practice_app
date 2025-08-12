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
        defalut : "",
    },
    difficulty : {
        type: String,
        enum : ["easy", "medium" ,"hard"],
        default: "medium"
    },
    createdAt : {
        type: Date,
        default : Date.now,
    }
});

export default mongoose.model("Question",questionSchema);