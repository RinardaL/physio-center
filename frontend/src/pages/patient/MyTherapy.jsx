import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../therapy.css";

// Patient view: the therapy written by the therapist, as a to-do / done checklist.

const taskDetail = (t) => {
  const parts = [];
  if (t.sets) parts.push(`${t.sets} sets`);
  if (t.reps) parts.push(`${t.reps} reps`);
  if (t.frequency) parts.push(t.frequency);
  if (t.exercise?.duration_minutes) parts.push(`${t.exercise.duration_minutes} min`);
  return parts.join(" · ");
};

export default function MyTherapy() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | todo | done
  const [busy, setBusy] = useState(null); // task id being updated
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const load = async () => {
    try {
      const res = await api.get("/therapy/mine");
      setPlans(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not load your therapy");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (task) => {
    const next = task.status === "done" ? "todo" : "done";
    setBusy(task.id);
    // optimistic update so the click feels instant
    setPlans((ps) =>
      ps.map((p) => {
        const tasks = p.tasks.map((t) => (t.id === task.id ? { ...t, status: next, completed_at: next === "done" ? new Date().toISOString() : null } : t));
        return { ...p, tasks, progress: { total: tasks.length, done: tasks.filter((t) => t.status === "done").length } };
      })
    );
    try {
      await api.patch(`/therapy/tasks/${task.id}/status`, { status: next });
      if (next === "done") toast.success("Nice work! Marked as done.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update the task");
      load();
    } finally {
      setBusy(null);
    }
  };

  const totals = plans.reduce(
    (acc, p) => ({ total: acc.total + p.progress.total, done: acc.done + p.progress.done }),
    { total: 0, done: 0 }
  );

  return (
    <>
      <Navbar />
      <div className="patientPage">
        <h1>My Therapy</h1>
        <p className="subtitle">
          {user?.name ? `Hi ${user.name.split(" ")[0]}, ` : ""}
          {totals.total > 0
            ? `you have completed ${totals.done} of ${totals.total} tasks. Tick each one when you have done it.`
            : "your therapist has not written a therapy plan for you yet."}
        </p>

        {plans.length > 0 && (
          <div className="filterTabs">
            {["all", "todo", "done"].map((f) => (
              <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>
                {f === "all" ? "All" : f === "todo" ? "To do" : "Done"}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="emptyState">Loading your therapy...</div>
        ) : plans.length === 0 ? (
          <div className="emptyState">
            Nothing here yet.
            <br />
            Once your therapist writes your therapy plan, the exercises and tasks will appear on this page.
          </div>
        ) : (
          <div className="therapyGrid">
            {plans.map((plan) => {
              const pct = plan.progress.total ? Math.round((plan.progress.done / plan.progress.total) * 100) : 0;
              const visible = plan.tasks.filter((t) => filter === "all" || t.status === filter);
              return (
                <div className="planCard" key={plan.id}>
                  <div className="planHead">
                    <div>
                      <h3>{plan.title}</h3>
                      <div className="planMeta">
                        {plan.Therapist ? `Therapist: ${plan.Therapist.first_name} ${plan.Therapist.last_name} · ` : ""}
                        {plan.start_date}
                        {plan.end_date ? ` → ${plan.end_date}` : ""}
                      </div>
                    </div>
                    <span className={`statusPill ${pct === 100 ? "done" : "todo"}`}>{pct === 100 ? "Completed" : "In progress"}</span>
                  </div>

                  {plan.description && <p className="planDesc">{plan.description}</p>}

                  <div className="progressBar">
                    <span style={{ width: `${pct}%` }} />
                  </div>
                  <div className="progressLabel">
                    {plan.progress.done} of {plan.progress.total} done
                  </div>

                  <ul className="taskList">
                    {visible.length === 0 && (
                      <li className="taskDetail" style={{ padding: "8px 4px" }}>
                        {filter === "done" ? "Nothing done yet in this plan." : "Everything in this plan is done."}
                      </li>
                    )}
                    {visible.map((t) => (
                      <li key={t.id} className={`taskItem ${t.status}`}>
                        <button
                          className="taskCheck"
                          disabled={busy === t.id}
                          title={t.status === "done" ? "Mark as to do" : "Mark as done"}
                          onClick={() => toggle(t)}
                        >
                          {t.status === "done" ? "✓" : ""}
                        </button>
                        <div className="taskBody">
                          <div className="taskTitle">{t.title}</div>
                          {(taskDetail(t) || t.instructions) && (
                            <div className="taskDetail">
                              {taskDetail(t)}
                              {taskDetail(t) && t.instructions ? " · " : ""}
                              {t.instructions}
                            </div>
                          )}
                          {t.status === "done" && t.completed_at && (
                            <div className="taskDetail">Done on {new Date(t.completed_at).toLocaleDateString()}</div>
                          )}
                        </div>
                        <span className={`statusPill ${t.status}`}>{t.status === "done" ? "Done" : "To do"}</span>
                      </li>
                    ))}
                  </ul>

                  {pct === 100 && plan.progress.total > 0 && <div className="allDone">All tasks completed. Great job!</div>}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
