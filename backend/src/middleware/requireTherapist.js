// Must run after authMiddleware (needs req.user).
const requireTherapist = (req, res, next) => {
  if (!req.user || req.user.role !== "therapist") {
    return res.status(403).json({ message: "Access denied: therapists only" });
  }
  next();
};

// Lets any logged-in user read (GET) but only therapists change data.
requireTherapist.forWrites = (req, res, next) => {
  if (req.method === "GET") return next();
  return requireTherapist(req, res, next);
};

module.exports = requireTherapist;
