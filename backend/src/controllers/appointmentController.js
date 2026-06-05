const { Appointment } = require("../models");

exports.createAppointment = async (req, res) => {
  try {
    const { therapistId, date, time } = req.body;
    const patientId = req.user.id;

    // vetëm pacienti
    if (req.user.role !== "patient") {
      return res.status(403).json({ message: "Vetëm pacientët mund të rezervojnë." });
    }

    // kontrollo konflikt
    const exists = await Appointment.findOne({
      where: { therapistId, date, time },
    });

    if (exists) {
      return res.status(400).json({ message: "Ky termi është i zënë." });
    }

    // orari
    const hour = parseInt(time.split(":")[0]);
    const day = new Date(date).getDay();

    if (day === 0) {
      return res.status(400).json({ message: "E diela nuk punon." });
    }

    if (day === 6 && (hour < 8 || hour >= 14)) {
      return res.status(400).json({ message: "Shtunë 08-14." });
    }

    if (day >= 1 && day <= 5 && (hour < 8 || hour >= 18)) {
      return res.status(400).json({ message: "Javë 08-18." });
    }

    const appointment = await Appointment.create({
      therapistId,
      patientId,
      date,
      time,
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};