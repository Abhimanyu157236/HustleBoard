import express from "express";
import { authMiddleware } from "../middleWare/authMiddleware.js";
import { addTask, getTask, getSingleTask, deleteTask, updateTask, toggleTask } from "../controllers/taskControllers.js";

const taskRouter = express.Router();

taskRouter.get("/", authMiddleware, getTask);
taskRouter.get("/:id",authMiddleware,getSingleTask)
taskRouter.post("/", authMiddleware, addTask);
taskRouter.delete("/:id",authMiddleware,deleteTask)
taskRouter.put("/:id",authMiddleware,updateTask)
taskRouter.patch("/:id",authMiddleware,toggleTask)

export default taskRouter;
