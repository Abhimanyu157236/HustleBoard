import { Task } from "../models/task.model.js";

export const getTask = async (req, res) => {
  try {
    const user = req.UserId
    const tasks = await Task.find({ user });
    res.status(201).json({ message: "task fetched", task : tasks });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

export const getSingleTask = async (req, res) => {
  try {
    const user = req.UserId
    const id = req.params.id
    const task = await Task.findOne({ user, taskId : id });
    res.status(201).json({ message: "task fetched", task : task });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};


export const addTask = async (req, res) => {
  const { title, desc, priority, tag, dueDate, taskId } = req.body
  try {
     const task = await new Task({title, decription : desc, priority, tag, dueDate, user : req.UserId, completed : false, taskId})
     task.save()
     res.status(201).json({message : "Task saved Successfully"})
   } catch (error) {
   res.status(500).json({message : error}) 
   }
};

export const deleteTask = async(req, res) => {
   try {
    const user = req.UserId
    const id = req.params.id
    const removedTask = await Task.deleteOne({user, taskId : id})
    res.status(200).json({message : "Task removed successfully" , task : removedTask})
   } catch (error) {
    res.status(500).json({message : error})
   }
}

export const updateTask = async(req, res) => {
  const { newTitle, newDescription, completed } = req.body
   try {
    const user = req.UserId
    const id = req.params.id
    const updatedTask = await Task.findOneAndUpdate({user, taskId : id} , { $set: { title: newTitle, decription : newDescription, completed : completed } }, {returnDocument: "after"})
     updatedTask.save();
    console.log("id:", id ,"user:", user, "updatedTask:", updatedTask)

    res.status(200).json({message : "Task Updated successfully" , task : updatedTask})
   } catch (error) {
    res.status(500).json({message : error})
   }
}

export const toggleTask = async(req, res) => {
  const { isCompleted } = req.body
   try {
    const user = req.UserId
    const id = req.params.id
    const updatedTask = await Task.findOneAndUpdate({user, taskId : id} , { $set: {  completed : isCompleted } }, {returnDocument: "after"})
    updatedTask.save();
    res.status(200).json({message : "Marked as completed"})
   } catch (error) {
    res.status(500).json({message : error})
   }
}

