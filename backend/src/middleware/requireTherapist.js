const requireTherapist = require("./middleware/requireTherapist");

const requireTherapist = (req, res, next) => {
  if (req.user.role !== "therapist") {
    return res.status(403).json({
      message: "Access denied",
    });
  }
  next();
};

module.exports = requireTherapist;