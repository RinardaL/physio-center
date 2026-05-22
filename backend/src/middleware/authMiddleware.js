const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware/authMiddleware");

app.use("/patients", authMiddleware, patientRoutes);
app.use("/sessions", authMiddleware, sessionRoutes);

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, "secretkey");
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
