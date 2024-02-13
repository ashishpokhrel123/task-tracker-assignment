Task Tracker Assignment
This project implements a Task Management API and a corresponding frontend using Node.js, Express, React.js, and various libraries. The API allows users to perform CRUD operations (Create, Read, Update, Delete) on tasks, while the frontend provides a user interface to interact with these tasks.

Features

1. Create a Task
   Users can create a new task by sending a POST request to /api/task.
   The request body should contain the task details (e.g., task name, completion status).
   Upon successful creation, the API returns the details of the created task, including its unique identifier (id).
2. Get All Tasks
   Users can retrieve all tasks by sending a GET request to /api/task.
   The API returns a list of all tasks currently stored in the system.
3. Get Task by ID
   Users can retrieve a specific task by its unique identifier (ID).
   They need to send a GET request to /api/task/:taskId, where :taskId is the ID of the task.
   The API returns the details of the requested task if it exists.
4. Delete Task
   Users can delete a task by sending a DELETE request to /api/task/:taskId.
   They need to specify the ID of the task to be deleted (:taskId).
   Upon successful deletion, the API returns a success status code (204 No Content).
5. Mark Task as Complete
   Users can mark a task as completed by sending a PUT request to /api/task/:taskId/complete.
   They need to specify the ID of the task (:taskId) to be marked as complete.
   The API updates the completion status of the task to true and returns the updated task details.
   Usage
   To use this project, follow these steps:

Clone this repository to your local machine.
For the backend, navigate to api/src and run npm install.
For the frontend, navigate to client and run npm install.
Technologies Used

Backend

Node.js
Express.js
In-memory data store


Frontend


React.js
Tailwind CSS
Ant Design for notifications
