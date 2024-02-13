const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
let tasks = [];

const addTask = async (taskBody) => {
  const { task } = taskBody;
  if (!task) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Task is required");
  }

  if (tasks.some((t) => t.task === task)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Task with this task already exists"
    );
  }

  const newTask = {
    id: tasks.length + 1,
    task,
    completed: false,
  };

  tasks.push(newTask);
  return newTask;
};

const getAllTasks = async () => {
  return tasks;
};

const updateTask = async (taskId, taskBody) => {
  const { task, completed } = taskBody;
  const taskToUpdate = tasks.find((t) => t.id === taskId);
  if (!taskToUpdate) {
    throw new ApiError(httpStatus.NOT_FOUND, `No task with id: ${taskId}`);
  }

  if (task) {
    taskToUpdate.task = task;
  }

  if (completed !== undefined) {
    taskToUpdate.completed = completed;
  }

  return taskToUpdate;
};

const getTaskById = async (taskId) => {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, `No task with id: ${taskId}`);
  }
  return task;
};

const getTaskByTask = async (task) => {
  const foundTask = tasks.find((t) => t.task === task);
  if (!foundTask) {
    throw new ApiError(httpStatus.NOT_FOUND, `No task with task: ${task}`);
  }
  return foundTask;
};
const deleteTask = async (taskId) => {
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(taskId));
  if (taskIndex === -1) {
    throw new ApiError(httpStatus.NOT_FOUND, `No task with ID: ${taskId}`);
  }
  const removedTask = tasks.splice(taskIndex, 1)[0];
  return removedTask; 
};

const markTaskAsComplete = async (taskId) => {
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(taskId));
  if (taskIndex === -1) {
    throw new ApiError(httpStatus.NOT_FOUND, `No task with ID: ${taskId}`);
  }
  const updatedTask = { ...tasks[taskIndex], completed: true };
  tasks[taskIndex] = updatedTask;

  return updatedTask; 
};



module.exports = {
  addTask,
  getAllTasks,
  getTaskById,
  getTaskByTask,
  updateTask,
  deleteTask,
  markTaskAsComplete,
};
