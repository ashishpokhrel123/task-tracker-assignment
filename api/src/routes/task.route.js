const express = require("express");
const taskController = require("../controllers/task.controller");
const validator = require("../middleware/validate");

const router = express.Router();


router
  .route("/")
  .post(validator("taskValidation"),taskController.addTask)
  .get(taskController.getTask);

router.delete("/:id", taskController.deleteTask);
router.put("/:id/complete", taskController.completeTask);

module.exports = router;
