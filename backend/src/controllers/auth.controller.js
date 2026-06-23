const userModel = require("../models/user.model");

const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(404).json({
        message: "all fields are required",
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(403).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(user._id);

    res.cookie("token", token);

    res.status(200).json({
      message: "User register successfully",
      success: true,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        message: "All fields should be fill",
      });
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "Invalid credentials",
      });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return res.status(404).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);

    res.cookie("token", token);

    return res.status(200).json({
      message: "User login successfully",
      success: true,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
    });

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

module.exports = {
  register,
  login,
  logout,
  getMe,
};
