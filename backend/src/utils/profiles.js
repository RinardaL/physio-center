// Links login accounts (User) to the clinic records (Patient / Therapist).
// A patient who registers gets a Patient record automatically; a therapist
// account gets a Therapist record the first time it is needed.
const { Patient, Therapist, User } = require("../models");

const splitName = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return {
    first: parts[0] || "Unknown",
    last: parts.slice(1).join(" ") || "-",
  };
};

// `user` can be the JWT payload ({ id, role }) or a full User row.
const loadUser = async (user) => (user && user.email ? user : User.findByPk(user.id));

async function getPatientProfile(user, { create = true } = {}) {
  let patient = await Patient.findOne({ where: { user_id: user.id } });
  if (patient) return patient;

  const account = await loadUser(user);
  if (!account) return null;

  // A therapist may already have created this patient by email: link it.
  patient = await Patient.findOne({ where: { email: account.email } });
  if (patient) {
    if (!patient.user_id) await patient.update({ user_id: account.id });
    return patient;
  }

  if (!create) return null;
  const { first, last } = splitName(account.name);
  return Patient.create({
    first_name: first,
    last_name: last,
    email: account.email,
    user_id: account.id,
  });
}

async function getTherapistProfile(user, { create = true } = {}) {
  let therapist = await Therapist.findOne({ where: { user_id: user.id } });
  if (therapist) return therapist;

  const account = await loadUser(user);
  if (!account) return null;

  // Match an existing therapist record by name before creating a new one.
  const { first, last } = splitName(account.name);
  therapist = await Therapist.findOne({ where: { first_name: first, last_name: last, user_id: null } });
  if (therapist) {
    await therapist.update({ user_id: account.id });
    return therapist;
  }

  if (!create) return null;
  return Therapist.create({
    first_name: first,
    last_name: last,
    specialization: "Physiotherapist",
    user_id: account.id,
  });
}

module.exports = { getPatientProfile, getTherapistProfile, splitName };
