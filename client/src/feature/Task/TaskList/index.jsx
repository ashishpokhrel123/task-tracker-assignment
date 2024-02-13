import React, { useState, useEffect } from "react";
import TaskForm from "../TaskForm";
import { fetchTasks, markTaskAsComplete, deleteTask } from "../../../api/task";
import { notification } from "antd";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      const tasksData = await fetchTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleComplete = async (taskId) => {
    try {
      await markTaskAsComplete(taskId);
      fetchAllTasks();
      notification.success({
        message: "Task Completed",
        description: "Task marked as complete successfully.",
      });
      setTimeout(() => {
        window.location.reload(); // Reload the page after a delay
      }, 3000); // Reload after 3 seconds
    } catch (error) {
      console.error("Error completing task:", error); 
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      fetchAllTasks();
      notification.success({
        message: "Task Deleted",
        description: "Task deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      notification.error({
        message: "Error",
        description: "Failed to delete task.",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Task List</h2>
      <div className="mb-4">
        <TaskForm />
      </div>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet</p>
      ) : (
        <div className="table-container">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">Task</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b mx-auto">
                  <td className={`py-2 px-4 ${task.completed ? 'line-through' : ''}`}>
                    {task.task}
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleComplete(task.id)}
                      className={`bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 ${task.completed ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={task.completed}
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className={`bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ${task.completed ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={task.completed}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TaskList;
