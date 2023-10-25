const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId

const taskSchema = new mongoose.Schema({
    user:{
        type:objectId,
        ref:"User"
    },

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    createdAt:{
        type:String
    },
    completedAt:{
        type:String
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("Task", taskSchema)