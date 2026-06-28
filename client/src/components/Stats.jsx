import CountUp from "./CountUp";

// The dashboard showing live counts and a completion progress bar
function Stats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  // Overdue = not completed AND the due date is already in the past
  const now = new Date();
  const overdue = tasks.filter(
    (t) => !t.completed && t.dueDate && new Date(t.dueDate) < now
  ).length;

  // How much of the work is done, as a percentage
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <>
      <div className="stats">
        <div className="stat-box">
          <span className="stat-number"><CountUp value={total} /></span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-box">
          <span className="stat-number"><CountUp value={completed} /></span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-box">
          <span className="stat-number"><CountUp value={pending} /></span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-box">
          <span className="stat-number"><CountUp value={overdue} /></span>
          <span className="stat-label">Overdue</span>
        </div>
      </div>

      <div className="progress-wrap">
        <div className="progress">
          <div className="progress-bar" style={{ width: percent + "%" }}></div>
        </div>
        <p className="progress-label">{percent}% completed</p>
      </div>
    </>
  );
}

export default Stats;
