const request = require("supertest");
const app = require("../app");

describe("Task API", () => {
  const newTask = {
    task: "Sample Task",
  };

  let taskIdCounter = 1;

  const taskId = taskIdCounter++;

  // Test creating a task
  it("should create a new task", async () => {
    const res = await request(app).post("/api/task").send(newTask).expect(201);

    expect(res.body.task).toBe(res.task);
    expect(res.body.completed).toBe(res.completed);
  });

  // Test marking a task as completed
  it("should mark a task as completed", async () => {
    const res = await request(app)
      .put(`/api/task/${taskId}/complete`)
      .expect(201);

    // Verify that the task is completed
    await request(app).get(`/api/task/`).expect(200);
  });

  // Test deleting a task
  it("should delete a task", async () => {
    await request(app).delete(`/api/task/${taskId}`).expect(204);

    // Verify that the task is deleted
    await request(app).get(`/api/task/${taskId}`).expect(404);
  });
});
