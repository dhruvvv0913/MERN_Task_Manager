// The small dashboard showing live counts of the user's tasks
function Stats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  // Overdue = not completed AND the due date is already in the past
  const now = new Date();
  const overdue = tasks.filter(
    (t) => !t.completed && t.dueDate && new Date(t.dueDate) < now
  ).length;

  return (
    <div className="stats">
      <div className="stat-box">
        <span className="stat-number">{total}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat-box">
        <span className="stat-number">{completed}</span>
        <span className="stat-label">Completed</span>
      </div>
      <div className="stat-box">
        <span className="stat-number">{pending}</span>
        <span className="stat-label">Pending</span>
      </div>
      <div className="stat-box">
        <span className="stat-number">{overdue}</span>
        <span className="stat-label">Overdue</span>
      </div>
    </div>
  );
}

export default Stats;
