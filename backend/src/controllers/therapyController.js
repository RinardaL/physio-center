// Therapy plans: a therapist writes a plan (TreatmentPlan) with tasks
// (TherapyTask) for a patient; the patient marks tasks to-do / done.
const { TreatmentPlan, TherapyTask, Patient, Therapist, Exercise } = require("../models");
const { getPatientProfile, getTherapistProfile } = require("../utils/profiles");

const planInclude = [
  { model: Patient, attributes: ["id", "first_name", "last_name", "email"] },
  { model: Therapist, attributes: ["therapist_id", "first_name", "last_name", "specialization"] },
  {
    model: TherapyTask,
    as: "tasks",
    include: [{ model: Exercise, as: "exercise", attributes: ["exercise_id", "name", "difficulty", "duration_minutes"] }],
  },
];

const withProgress = (plan) => {
  const p = plan.toJSON();
  p.tasks = (p.tasks || []).sort((a, b) => a.position - b.position || a.id - b.id);
  p.progress = {
    total: p.tasks.length,
    done: p.tasks.filter((t) => t.status === "done").length,
  };
  return p;
};

const loadPlan = (id) => TreatmentPlan.findByPk(id, { include: planInclude });

const cleanTask = (t = {}, position = 0) => ({
  exercise_id: t.exercise_id ? Number(t.exercise_id) : null,
  title: (t.title || "").trim(),
  instructions: t.instructions || null,
  sets: t.sets ? Number(t.sets) : null,
  reps: t.reps ? Number(t.reps) : null,
  frequency: t.frequency || null,
  position,
});

// Fill a missing task title from the chosen exercise.
const resolveTitle = async (task) => {
  if (task.title) return task;
  if (task.exercise_id) {
    const ex = await Exercise.findByPk(task.exercise_id);
    if (ex) return { ...task, title: ex.name };
  }
  return task;
};

// Can this user see / tick tasks of this plan?
const canAccessPlan = async (user, plan) => {
  if (user.role === "therapist") return true;
  const patient = await getPatientProfile(user, { create: false });
  return !!patient && plan.patient_id === patient.id;
};

// ---------- therapist: plans ----------

exports.listPlans = async (req, res) => {
  try {
    const plans = await TreatmentPlan.findAll({ include: planInclude, order: [["createdAt", "DESC"]] });
    res.json(plans.map(withProgress));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPlan = async (req, res) => {
  try {
    const { patient_id, title, description, start_date, end_date, notes, tasks = [] } = req.body;

    if (!patient_id || !title || !start_date) {
      return res.status(400).json({ message: "patient_id, title and start_date are required" });
    }
    const patient = await Patient.findByPk(patient_id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const therapist = await getTherapistProfile(req.user);

    const plan = await TreatmentPlan.create({
      patient_id: patient.id,
      therapist_id: therapist.therapist_id,
      title,
      description: description || null,
      start_date,
      end_date: end_date || null,
      notes: notes || null,
    });

    const rows = [];
    for (let i = 0; i < tasks.length; i++) {
      const t = await resolveTitle(cleanTask(tasks[i], i));
      if (t.title) rows.push({ ...t, treatment_plan_id: plan.id });
    }
    if (rows.length) await TherapyTask.bulkCreate(rows);

    res.status(201).json(withProgress(await loadPlan(plan.id)));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPlan = async (req, res) => {
  try {
    const plan = await loadPlan(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    if (!(await canAccessPlan(req.user, plan))) return res.status(403).json({ message: "Access denied" });
    res.json(withProgress(plan));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const plan = await TreatmentPlan.findByPk(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const { patient_id, title, description, start_date, end_date, notes } = req.body;
    if (patient_id && !(await Patient.findByPk(patient_id))) {
      return res.status(404).json({ message: "Patient not found" });
    }
    await plan.update({
      ...(patient_id && { patient_id }),
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(start_date !== undefined && { start_date }),
      ...(end_date !== undefined && { end_date: end_date || null }),
      ...(notes !== undefined && { notes }),
    });
    res.json(withProgress(await loadPlan(plan.id)));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const plan = await TreatmentPlan.findByPk(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    await TherapyTask.destroy({ where: { treatment_plan_id: plan.id } });
    await plan.destroy();
    res.json({ message: "Plan deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------- therapist: tasks ----------

exports.addTask = async (req, res) => {
  try {
    const plan = await TreatmentPlan.findByPk(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const count = await TherapyTask.count({ where: { treatment_plan_id: plan.id } });
    const task = await resolveTitle(cleanTask(req.body, count));
    if (!task.title) return res.status(400).json({ message: "A title or an exercise is required" });

    const created = await TherapyTask.create({ ...task, treatment_plan_id: plan.id });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await TherapyTask.findByPk(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const { title, instructions, exercise_id, sets, reps, frequency, position } = req.body;
    await task.update({
      ...(title !== undefined && { title }),
      ...(instructions !== undefined && { instructions }),
      ...(exercise_id !== undefined && { exercise_id: exercise_id || null }),
      ...(sets !== undefined && { sets: sets || null }),
      ...(reps !== undefined && { reps: reps || null }),
      ...(frequency !== undefined && { frequency }),
      ...(position !== undefined && { position }),
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await TherapyTask.findByPk(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    await task.destroy();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------- patient ----------

exports.myPlans = async (req, res) => {
  try {
    if (req.user.role !== "patient") {
      return res.status(403).json({ message: "Only patients have a personal therapy page" });
    }
    const patient = await getPatientProfile(req.user);
    const plans = await TreatmentPlan.findAll({
      where: { patient_id: patient.id },
      include: planInclude,
      order: [["start_date", "DESC"]],
    });
    res.json(plans.map(withProgress));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /therapy/tasks/:taskId/status  { status: "done" | "todo" }
exports.setTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["todo", "done"].includes(status)) {
      return res.status(400).json({ message: "status must be 'todo' or 'done'" });
    }
    const task = await TherapyTask.findByPk(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const plan = await TreatmentPlan.findByPk(task.treatment_plan_id);
    if (!plan || !(await canAccessPlan(req.user, plan))) {
      return res.status(403).json({ message: "Access denied" });
    }

    await task.update({ status, completed_at: status === "done" ? new Date() : null });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
