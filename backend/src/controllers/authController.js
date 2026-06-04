const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "patient",
    });

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
      {
        id: user.id,
        role: user.role,
      },
      process.env.ACCESS_SECRET,
      { expiresIn: "15m" }
    );

  
    const refreshToken = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
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
      return res.status(401).json({ message: "No refresh token" });
    }

    jwt.verify(token, process.env.REFRESH_SECRET, async (err, decoded) => {
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

module.exports = { register, login, refreshToken };