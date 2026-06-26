import { useState } from "react";

// One row in the task list. It can switch into an "edit" mode.
function TaskItem({ task, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  // Local copies of the fields, used only while editing
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? task.dueDate.slice(0, 10) : ""
  );

  function handleSave() {
    if (!title.trim()) return;
    onUpdate(task._id, {
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate || null,
    });
    setEditing(false);
  }

  function handleCancel() {
    // Reset the fields back to the original task values
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : "");
    setEditing(false);
  }

  // ----- Edit mode -----
  if (editing) {
    return (
      <li className="task-item editing">
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <div className="form-row">
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="task-buttons">
          <button onClick={handleSave}>Save</button>
          <button className="secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </li>
    );
  }

  // ----- Normal view -----
  return (
    <li className={"task-item" + (task.completed ? " completed" : "")}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task._id)}
      />

      <div className="task-info">
        <div className="task-title">
          {task.title}
          <span className={"badge " + task.priority.toLowerCase()}>
            {task.priority}
          </span>
        </div>
        {task.description && <p className="task-desc">{task.description}</p>}
        {task.dueDate && (
          <p className="task-due">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="task-buttons">
        <button onClick={() => setEditing(true)}>Edit</button>
        <button className="danger" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
