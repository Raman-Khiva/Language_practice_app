import mongoose from "mongoose";


const progressCountSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId,
               ref: 'User', 
               required: true, 
               unique: true 
            },
    totalCount : [
        {
            category : String,
            difficulty :{
                type : [Number],
                default : Array(12).fill(0)
            }
        }
    ],

    dailyCount : [
        {
        date : { type: Date, required : true },
        count : Number
    }
    ]



});


export default mongoose.model("ProgressCount", progressCountSchema);