import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import authRouter from "./routes/auth.route.js";
import taskRouter from "./routes/task.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", authRouter);
app.use("/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("Welcome to HustleBoard API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
