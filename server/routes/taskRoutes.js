const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getTasks,
  createTask,
  getTask,
  updateTask,
  toggleTask,
  deleteTask,
  deleteCompleted,
} = require("../controllers/taskController");

// Every route below this line needs a valid token
router.use(auth);

// GET    /api/tasks            -> all of the user's tasks
router.get("/", getTasks);

// POST   /api/tasks            -> create a task
router.post("/", createTask);

// DELETE /api/tasks/completed  -> delete all completed tasks
// (kept above "/:id" so "completed" is not mistaken for an id)
router.delete("/completed", deleteCompleted);

// GET    /api/tasks/:id        -> one task
router.get("/:id", getTask);

// PUT    /api/tasks/:id        -> edit a task
router.put("/:id", updateTask);

// PATCH  /api/tasks/:id/toggle -> mark done / not done
router.patch("/:id/toggle", toggleTask);

// DELETE /api/tasks/:id        -> delete a task
router.delete("/:id", deleteTask);

module.exports = router;
