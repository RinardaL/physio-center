const { Appointment, User } = require("../models");

const include = [
  { model: User, as: "patient", attributes: ["id", "name", "email"] },
  { model: User, as: "therapist", attributes: ["id", "name", "email"] },
];

// Therapist accounts a patient can book with.
exports.listTherapists = async (req, res) => {
  try {
    const therapists = await User.findAll({
      where: { role: "therapist" },
      attributes: ["id", "name"],
      order: [["name", "ASC"]],
    });
    res.json(therapists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Patients see their own appointments, therapists see every appointment.
exports.listAppointments = async (req, res) => {
  try {
    const where = req.user.role === "therapist" ? {} : { patientId: req.user.id };
    const appointments = await Appointment.findAll({
      where,
      include,
      order: [["date", "DESC"], ["time", "DESC"]],
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { therapistId, date, time } = req.body;
    const patientId = req.user.id;

    if (req.user.role !== "patient") {
      return res.status(403).json({ message: "Only patients can book appointments." });
    }
    if (!therapistId || !date || !time) {
      return res.status(400).json({ message: "Therapist, date and time are required." });
    }

    const therapist = await User.findOne({ where: { id: therapistId, role: "therapist" } });
    if (!therapist) return res.status(404).json({ message: "Therapist not found." });

    const taken = await Appointment.findOne({
      where: { therapistId, date, time, status: ["pending", "confirmed"] },
    });
    if (taken) return res.status(400).json({ message: "This slot is already taken." });

    const hour = parseInt(time.split(":")[0], 10);
    const day = new Date(date).getDay();

    if (day === 0) return res.status(400).json({ message: "The clinic is closed on Sundays." });
    if (day === 6 && (hour < 8 || hour >= 14)) {
      return res.status(400).json({ message: "Saturday hours are 08:00 to 14:00." });
    }
    if (day >= 1 && day <= 5 && (hour < 8 || hour >= 18)) {
      return res.status(400).json({ message: "Weekday hours are 08:00 to 18:00." });
    }

    const appointment = await Appointment.create({ therapistId, patientId, date, time });
    const full = await Appointment.findByPk(appointment.id, { include });
    res.status(201).json(full);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /appointments/:id/status  { status }
// Therapists can set any status; a patient can only cancel their own booking.
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found." });

    if (req.user.role !== "therapist") {
      if (appointment.patientId !== req.user.id || status !== "cancelled") {
        return res.status(403).json({ message: "You can only cancel your own appointments." });
      }
    }

    await appointment.update({ status });
    const full = await Appointment.findByPk(appointment.id, { include });
    res.json(full);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
