import express from "express";
import cors from "cors";
import { addTask, deleteTaskByIndex, deleteAllTasks } from "./src/todo.js";

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.json());

app.post("/addTask", (req, res) => {
  const taskText = req.body.task;
  const result = addTask(taskText);
  res.json({ success: result });
});

app.delete("/deleteTask/:index", (req, res) => {
  const taskIndex = req.params.index;
  const result = deleteTaskByIndex(taskIndex);
  res.json({ success: result });
});

app.delete("/deleteAllTasks", (req, res) => {
  const result = deleteAllTasks();
  res.json({ success: result });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
