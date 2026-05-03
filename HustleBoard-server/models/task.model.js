import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskId : {
     type: String,
     required: true,
  },
    title : {
     type: String,
     required: true,
  },
  decription : {
     type: String,
     required: true,
  },
   dueDate : {
     type : Date,
     required: true,
  },
   tag : {
     type: String,
     enum : ["Work", "Personal", "Urgent", "Health", "Gym"],
     default : "personal",
     required: true,
  },
  priority : {
     type: String,
     enum : ["Low", "High", "Very High"],
     default : "Low",
     required: true,
  },
  completed : {
     type: Boolean,
     default : false,
     required: true,
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
  }

}, {timestamps : true})

export const Task = mongoose.model("Task", taskSchema)