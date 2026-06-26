const Task = require("../models/Task");

// Get all tasks that belong to the logged-in user (newest first)
async function getTasks(req, res, next) {
  try {
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
}

// Create a new task
async function createTask(req, res, next) {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      user: req.userId, // the task belongs to the current user
      title,
      description,
      priority,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

// Get one task by its id
async function getTask(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Only the owner may view it
    if (task.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
}

// Update a task's details
async function updateTask(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // Change only the fields that were actually sent
    const { title, description, priority, dueDate, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (completed !== undefined) task.completed = completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
}

// Switch a task between completed and not completed
async function toggleTask(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.completed = !task.completed;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
}

// Delete one task
async function deleteTask(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
}

// Delete all of the user's completed tasks at once
async function deleteCompleted(req, res, next) {
  try {
    await Task.deleteMany({ user: req.userId, completed: true });
    res.json({ message: "Completed tasks deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  toggleTask,
  deleteTask,
  deleteCompleted,
};
