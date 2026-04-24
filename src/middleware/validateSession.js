module.exports = (req, res, next) => {
  const {
    patient_id,
    therapist_id,
    treatment_id,
    date,
    start_time,
    end_time,
  } = req.body;

  if (
    !patient_id ||
    !therapist_id ||
    !treatment_id ||
    !date ||
    !start_time ||
    !end_time
  ) {
    return res.status(400).send("Missing required fields");
  }

  next();
};