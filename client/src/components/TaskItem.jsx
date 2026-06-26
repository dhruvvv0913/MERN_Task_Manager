import { useState } from "react";

// One row in the task list. It can switch into an "edit" mode and
// shows a confirmation popup before deleting.
function TaskItem({ task, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [confirming, setConfirming] = useState(false);

  // Local copies of the fields, used only while editing
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? task.dueDate.slice(0, 10) : ""
  );

  // A task is overdue if it is not done and its due date is in the past
  const isOverdue =
    !task.completed && task.dueDate && new Date(task.dueDate) < new Date();

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
    <li
      className={
        "task-item" +
        (task.completed ? " completed" : "") +
        (isOverdue ? " overdue" : "")
      }
    >
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
          <p className={"task-due" + (isOverdue ? " overdue-text" : "")}>
            Due: {new Date(task.dueDate).toLocaleDateString()}
            {isOverdue ? " (overdue)" : ""}
          </p>
        )}
      </div>

      <div className="task-buttons">
        <button onClick={() => setEditing(true)}>Edit</button>
        <button className="danger" onClick={() => setConfirming(true)}>
          Delete
        </button>
      </div>

      {/* Confirmation popup, shown only when the Delete button was clicked */}
      {confirming && (
        <div className="modal-overlay" onClick={() => setConfirming(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p>Delete this task?</p>
            <p className="modal-task">"{task.title}"</p>
            <div className="modal-buttons">
              <button className="secondary" onClick={() => setConfirming(false)}>
                Cancel
              </button>
              <button
                className="danger"
                onClick={() => {
                  onDelete(task._id);
                  setConfirming(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export default TaskItem;
