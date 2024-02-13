const taskService = require("../services/task.service");
const catchAsync = require("../utils/catchAsync");

const addTask = catchAsync(async (req, res) => {
  const newTask = req.body;
  const task = await taskService.addTask(newTask);
  res.sendStatus(201).send(task); 
});

const getTask = catchAsync(async (req, res) => {
  const tasks = await taskService.getAllTasks();
  res.status(200).send(tasks); 
});

const getTaskById = catchAsync(async (req, res) => {
  const taskId = req.params.id;
  const task = await taskService.getTaskById(taskId); 
  res.status(200).send(task); 
});

const updateTask = catchAsync(async (req, res) => {
  const taskId = req.params.id;
  const taskBody = req.body;
  const updatedTask = await taskService.updateTask(taskId, taskBody); 
  res.status(200).send(updatedTask); 
});

const deleteTask = catchAsync(async (req, res) => {
  const taskId = req.params.id;
  await taskService.deleteTask(taskId); 
  res.sendStatus(204); 
});

const completeTask = catchAsync(async (req, res) => {
  const taskId = req.params.id;
  console.log(taskId, "idd")
  const updatedTask = await  taskService.markTaskAsComplete(taskId);
  res.sendStatus(201).send(updatedTask); 
});

module.exports = {
  addTask,
  getTask,
  updateTask,
  deleteTask,
  getTaskById,
  completeTask
};
