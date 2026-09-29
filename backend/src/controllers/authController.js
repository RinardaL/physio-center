const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { getPatientProfile, getTherapistProfile } = require("../utils/profiles");

// Who is allowed to create a therapist account:
//  - a logged-in therapist (Authorization header), or
//  - anyone, only while the clinic has no therapist yet (first setup).
const canCreateTherapist = async (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      if (decoded.role === "therapist") return true;
    } catch (e) {
      /* fall through */
    }
  }
  return (await User.count({ where: { role: "therapist" } })) === 0;
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let role = "patient";
    if (req.body.role === "therapist") {
      if (!(await canCreateTherapist(req))) {
        return res.status(403).json({ message: "Only a therapist can create therapist accounts" });
      }
      role = "therapist";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Create the matching clinic record so the account shows up in the
    // Patients / Therapists lists and can receive therapy plans.
    try {
      if (role === "patient") await getPatientProfile(newUser);
      else await getTherapistProfile(newUser);
    } catch (profileErr) {
      console.error("Profile creation failed:", profileErr.message);
    }

    return res.status(201).json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.ACCESS_SECRET,
      { expiresIn: "30m" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


const refreshToken = (req, res) => {
  try {
    const token = req.cookies.refreshToken;
 
    if (!token) {
      res.clearCookie("refreshToken", {
        path: "/api/auth/refresh",
      });

      return res.status(401).json({ message: "No refresh token" });
    }

    jwt.verify(token, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      const newAccessToken = jwt.sign(
        { id: decoded.id, role: decoded.role },
        process.env.ACCESS_SECRET,
        { expiresIn: "15m" }
      );

      return res.json({ accessToken: newAccessToken });
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    path: "/api/auth/refresh",
  });

  return res.json({ message: "Logged out" });
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
};