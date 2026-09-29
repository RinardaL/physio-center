import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api";
import "../therapy.css";

// Therapist view: write a therapy plan (tasks) for a patient and follow progress.

const emptyTask = () => ({ exercise_id: "", title: "", instructions: "", sets: "", reps: "", frequency: "" });

const emptyForm = () => ({
  patient_id: "",
  title: "",
  description: "",
  start_date: new Date().toISOString().slice(0, 10),
  end_date: "",
  notes: "",
});

const taskDetail = (t) => {
  const parts = [];
  if (t.sets) parts.push(`${t.sets} sets`);
  if (t.reps) parts.push(`${t.reps} reps`);
  if (t.frequency) parts.push(t.frequency);
  if (t.exercise?.duration_minutes) parts.push(`${t.exercise.duration_minutes} min`);
  return parts.join(" · ");
};

export default function Therapy() {
  const [plans, setPlans] = useState([]);
  const [patients, setPatients] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [tasks, setTasks] = useState([emptyTask()]);
  const [expanded, setExpanded] = useState(null);
  const [addingTo, setAddingTo] = useState(null); // plan id with the inline "add task" form open
  const [newTask, setNewTask] = useState(emptyTask());

  const load = async () => {
    try {
      const [p, pa, ex] = await Promise.all([api.get("/therapy"), api.get("/patients"), api.get("/exercises")]);
      setPlans(p.data);
      setPatients(pa.data);
      setExercises(ex.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not load therapy plans");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const patientName = (plan) =>
    plan.Patient ? `${plan.Patient.first_name} ${plan.Patient.last_name}` : `Patient #${plan.patient_id}`;

  const filtered = plans.filter((p) => {
    const q = search.toLowerCase();
    return p.title.toLowerCase().includes(q) || patientName(p).toLowerCase().includes(q);
  });

  // ----- new plan form -----
  const updateTask = (i, field, value) => {
    setTasks((rows) => rows.map((r, idx) => (idx === i ? { ...r, [field]: value } : r)));
  };

  const pickExercise = (i, exercise_id) => {
    const ex = exercises.find((e) => String(e.exercise_id) === String(exercise_id));
    setTasks((rows) =>
      rows.map((r, idx) => (idx === i ? { ...r, exercise_id, title: ex && !r.title ? ex.name : r.title } : r))
    );
  };

  const submitPlan = async (e) => {
    e.preventDefault();
    const validTasks = tasks.filter((t) => t.title.trim() || t.exercise_id);
    if (!form.patient_id) return toast.error("Choose a patient");
    if (validTasks.length === 0) return toast.error("Add at least one task");

    setSaving(true);
    try {
      await api.post("/therapy", { ...form, tasks: validTasks });
      toast.success("Therapy plan created");
      setShowForm(false);
      setForm(emptyForm());
      setTasks([emptyTask()]);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not save the plan");
    } finally {
      setSaving(false);
    }
  };

  // ----- existing plans -----
  const deletePlan = async (plan) => {
    if (!window.confirm(`Delete "${plan.title}" for ${patientName(plan)}?`)) return;
    try {
      await api.delete(`/therapy/${plan.id}`);
      toast.success("Plan deleted");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not delete");
    }
  };

  const toggleTask = async (task) => {
    try {
      await api.patch(`/therapy/tasks/${task.id}/status`, { status: task.status === "done" ? "todo" : "done" });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update task");
    }
  };

  const deleteTask = async (task) => {
    try {
      await api.delete(`/therapy/tasks/${task.id}`);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not delete task");
    }
  };

  const submitNewTask = async (planId) => {
    if (!newTask.title.trim() && !newTask.exercise_id) return toast.error("Give the task a title or pick an exercise");
    try {
      await api.post(`/therapy/${planId}/tasks`, newTask);
      toast.success("Task added");
      setNewTask(emptyTask());
      setAddingTo(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not add task");
    }
  };

  const exerciseOptions = (
    <>
      <option value="">Custom task (no exercise)</option>
      {exercises.map((ex) => (
        <option key={ex.exercise_id} value={ex.exercise_id}>
          {ex.name}
          {ex.difficulty ? ` · ${ex.difficulty}` : ""}
        </option>
      ))}
    </>
  );

  return (
    <div className="dashboard">
      <div className="hero">
        <h1>Therapy Plans</h1>
        <p>Write a therapy for a patient and follow what they have completed.</p>
      </div>

      <div className="patientsToolbar">
        <input
          className="searchInput"
          placeholder="Search by patient or plan title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="primaryBtn" onClick={() => setShowForm(true)}>
          + New Therapy
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="emptyState">
          No therapy plans yet.
          <br />
          Click <strong>+ New Therapy</strong> to write the first one.
        </div>
      ) : (
        <div className="therapyGrid">
          {filtered.map((plan) => {
            const pct = plan.progress.total ? Math.round((plan.progress.done / plan.progress.total) * 100) : 0;
            const open = expanded === plan.id;
            return (
              <div className="planCard" key={plan.id}>
                <div className="planHead">
                  <div>
                    <h3>{plan.title}</h3>
                    <div className="planMeta">
                      <strong>{patientName(plan)}</strong>
                      {plan.Patient?.email ? ` · ${plan.Patient.email}` : ""} · {plan.start_date}
                      {plan.end_date ? ` → ${plan.end_date}` : ""}
                      {plan.Therapist ? ` · by ${plan.Therapist.first_name} ${plan.Therapist.last_name}` : ""}
                    </div>
                  </div>
                  <div className="taskActions">
                    <button className="ghostBtn" onClick={() => setExpanded(open ? null : plan.id)}>
                      {open ? "Hide tasks" : `Show tasks (${plan.progress.total})`}
                    </button>
                    <button className="dangerBtn" onClick={() => deletePlan(plan)}>
                      Delete
                    </button>
                  </div>
                </div>

                {plan.description && <p className="planDesc">{plan.description}</p>}

                <div className="progressBar">
                  <span style={{ width: `${pct}%` }} />
                </div>
                <div className="progressLabel">
                  {plan.progress.done} of {plan.progress.total} tasks done ({pct}%)
                </div>

                {open && (
                  <>
                    <ul className="taskList">
                      {plan.tasks.map((t) => (
                        <li key={t.id} className={`taskItem ${t.status}`}>
                          <button className="taskCheck" title="Toggle done" onClick={() => toggleTask(t)}>
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
                              <div className="taskDetail">Done on {new Date(t.completed_at).toLocaleString()}</div>
                            )}
                          </div>
                          <div className="taskActions">
                            <span className={`statusPill ${t.status}`}>{t.status === "done" ? "Done" : "To do"}</span>
                            <button className="dangerBtn" onClick={() => deleteTask(t)}>
                              ✕
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {addingTo === plan.id ? (
                      <div className="inlineForm">
                        <div className="taskRow">
                          <div className="taskRowHead">New task</div>
                          <select
                            className="full"
                            value={newTask.exercise_id}
                            onChange={(e) => {
                              const ex = exercises.find((x) => String(x.exercise_id) === e.target.value);
                              setNewTask({ ...newTask, exercise_id: e.target.value, title: ex && !newTask.title ? ex.name : newTask.title });
                            }}
                          >
                            {exerciseOptions}
                          </select>
                          <input
                            className="full"
                            placeholder="Task title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                          />
                          <input placeholder="Sets" type="number" value={newTask.sets} onChange={(e) => setNewTask({ ...newTask, sets: e.target.value })} />
                          <input placeholder="Reps" type="number" value={newTask.reps} onChange={(e) => setNewTask({ ...newTask, reps: e.target.value })} />
                          <input
                            className="full"
                            placeholder="Frequency (e.g. daily, 3x per week)"
                            value={newTask.frequency}
                            onChange={(e) => setNewTask({ ...newTask, frequency: e.target.value })}
                          />
                          <textarea
                            className="full"
                            placeholder="Instructions for the patient"
                            value={newTask.instructions}
                            onChange={(e) => setNewTask({ ...newTask, instructions: e.target.value })}
                          />
                        </div>
                        <div className="taskActions">
                          <button className="successBtn" onClick={() => submitNewTask(plan.id)}>
                            Add task
                          </button>
                          <button className="ghostBtn" onClick={() => setAddingTo(null)}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button className="linkBtn" style={{ marginTop: 10 }} onClick={() => { setAddingTo(plan.id); setNewTask(emptyTask()); }}>
                        + Add task
                      </button>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showForm && (
        <div className="modal" onClick={() => setShowForm(false)}>
          <div className="modalBox wide" onClick={(e) => e.stopPropagation()}>
            <h2>New Therapy Plan</h2>

            <form onSubmit={submitPlan} className="form">
              <select name="patient_id" value={form.patient_id} onChange={(e) => setForm({ ...form, patient_id: e.target.value })} required>
                <option value="">Choose a patient</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.first_name} {p.last_name}
                    {p.email ? ` · ${p.email}` : ""}
                  </option>
                ))}
              </select>

              <input
                placeholder="Plan title (e.g. Knee rehabilitation, week 1)"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />

              <textarea
                placeholder="Description / goal of this therapy"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />

              <div className="taskRow" style={{ border: "none", padding: 0, background: "none" }}>
                <label style={{ fontSize: 13, color: "#8a7a70" }}>
                  Start date
                  <input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} required />
                </label>
                <label style={{ fontSize: 13, color: "#8a7a70" }}>
                  End date (optional)
                  <input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} />
                </label>
              </div>

              <strong style={{ color: "#5a4a42" }}>Tasks for the patient</strong>

              {tasks.map((t, i) => (
                <div className="taskRow" key={i}>
                  <div className="taskRowHead">
                    <span>Task {i + 1}</span>
                    {tasks.length > 1 && (
                      <button type="button" className="linkBtn" onClick={() => setTasks(tasks.filter((_, idx) => idx !== i))}>
                        Remove
                      </button>
                    )}
                  </div>
                  <select className="full" value={t.exercise_id} onChange={(e) => pickExercise(i, e.target.value)}>
                    {exerciseOptions}
                  </select>
                  <input className="full" placeholder="Task title" value={t.title} onChange={(e) => updateTask(i, "title", e.target.value)} />
                  <input placeholder="Sets" type="number" value={t.sets} onChange={(e) => updateTask(i, "sets", e.target.value)} />
                  <input placeholder="Reps" type="number" value={t.reps} onChange={(e) => updateTask(i, "reps", e.target.value)} />
                  <input
                    className="full"
                    placeholder="Frequency (e.g. daily, 3x per week)"
                    value={t.frequency}
                    onChange={(e) => updateTask(i, "frequency", e.target.value)}
                  />
                  <textarea
                    className="full"
                    placeholder="Instructions for the patient"
                    value={t.instructions}
                    onChange={(e) => updateTask(i, "instructions", e.target.value)}
                  />
                </div>
              ))}

              <button type="button" className="ghostBtn" onClick={() => setTasks([...tasks, emptyTask()])}>
                + Another task
              </button>

              <textarea placeholder="Private notes (only therapists see these)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />

              <button className="primaryBtn" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Therapy Plan"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
