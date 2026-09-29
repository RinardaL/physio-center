// Creates demo accounts for local testing. Run from backend/:  node scripts/seed-demo.js
// Safe to run more than once (existing accounts are left untouched).
//
//   Therapist:  therapist@demo.com / demo1234
//   Patient:    patient@demo.com   / demo1234
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { sequelize, User, Exercise } = require("../src/models");
const { getPatientProfile, getTherapistProfile } = require("../src/utils/profiles");

const demo = [
  { name: "Demo Therapist", email: "therapist@demo.com", role: "therapist" },
  { name: "Demo Patient", email: "patient@demo.com", role: "patient" },
];

const exercises = [
  { name: "Wall squat", description: "Back against the wall, slide down to 45 degrees and hold.", difficulty: "medium", duration_minutes: 5 },
  { name: "Heel raises", description: "Rise onto the toes slowly, lower over 3 seconds.", difficulty: "easy", duration_minutes: 3 },
  { name: "Hamstring stretch", description: "Seated, reach towards the toes and hold 30 seconds.", difficulty: "easy", duration_minutes: 4 },
];

(async () => {
  try {
    await sequelize.authenticate();
    const password = await bcrypt.hash("demo1234", 10);

    for (const d of demo) {
      let user = await User.findOne({ where: { email: d.email } });
      if (!user) {
        user = await User.create({ ...d, password });
        console.log(`created ${d.role}: ${d.email}`);
      } else {
        console.log(`exists  ${d.role}: ${d.email}`);
      }
      if (d.role === "patient") await getPatientProfile(user);
      else await getTherapistProfile(user);
    }

    for (const ex of exercises) {
      const [row, created] = await Exercise.findOrCreate({ where: { name: ex.name }, defaults: ex });
      console.log(`${created ? "created" : "exists "} exercise: ${row.name}`);
    }

    console.log("done");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
