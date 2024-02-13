import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
export const addTask = async (taskData) => {
  try {
    const response = await axios.post(apiUrl, taskData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to add task: ${error.message}`);
  }
};

export const fetchTasks = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }
};

export const markTaskAsComplete = async (taskId) => {
  try {
    const response = await axios.put(`${apiUrl}/${taskId}/complete`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to mark task as complete: ${error.message}`);
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${apiUrl}/${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete task: ${error.message}`);
  }
};
