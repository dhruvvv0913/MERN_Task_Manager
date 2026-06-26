import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import Stats from "../components/Stats";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Toolbar controls
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest"); // newest | oldest | priority | dueDate

  // Load the user's tasks from the API when the page first opens
  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      toast.error("Could not load tasks");
    } finally {
      setLoading(false);
    }
  }

  // Add a new task
  async function addTask(newTask) {
    try {
      const res = await api.post("/tasks", newTask);
      setTasks([res.data, ...tasks]); // show the new task at the top
      toast.success("Task added");
    } catch (error) {
      const message = error.response?.data?.message || "Could not add task";
      toast.error(message);
    }
  }

  // Mark a task done / not done
  async function toggleTask(id) {
    try {
      const res = await api.patch(`/tasks/${id}/toggle`);
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (error) {
      toast.error("Could not update task");
    }
  }

  // Save edits to a task
  async function updateTask(id, updates) {
    try {
      const res = await api.put(`/tasks/${id}`, updates);
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
      toast.success("Task updated");
    } catch (error) {
      toast.error("Could not update task");
    }
  }

  // Delete one task
  async function deleteTask(id) {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Could not delete task");
    }
  }

  // Delete all completed tasks at once
  async function clearCompleted() {
    try {
      await api.delete("/tasks/completed");
      setTasks(tasks.filter((t) => !t.completed));
      toast.success("Completed tasks cleared");
    } catch (error) {
      toast.error("Could not clear tasks");
    }
  }

  // Work out which tasks to show: filter -> search -> sort
  const visibleTasks = tasks
    .filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    })
    .filter((t) => {
      const text = (t.title + " " + t.description).toLowerCase();
      return text.includes(search.toLowerCase());
    })
    .sort((a, b) => {
      if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sort === "priority") {
        const order = { High: 1, Medium: 2, Low: 3 };
        return order[a.priority] - order[b.priority];
      }
      if (sort === "dueDate") {
        if (!a.dueDate) return 1; // tasks with no due date go last
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });

  return (
    <div className="dashboard">
      <Stats tasks={tasks} />

      <TaskForm onAdd={addTask} />

      <div className="toolbar">
        <input
          className="search"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "active" ? "active" : ""}
            onClick={() => setFilter("active")}
          >
            Pending
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>

      {loading ? (
        <div className="spinner-wrap">
          <div className="spinner"></div>
        </div>
      ) : visibleTasks.length === 0 ? (
        <div className="empty-state">
          <span className="emoji">📝</span>
          No tasks to show. Add one above!
        </div>
      ) : (
        <ul className="task-list">
          {visibleTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={toggleTask}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      )}

      {tasks.some((t) => t.completed) && (
        <button className="clear-btn" onClick={clearCompleted}>
          Clear completed
        </button>
      )}
    </div>
  );
}

export default Dashboard;
