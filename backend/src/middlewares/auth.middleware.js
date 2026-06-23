const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const config = require("../config/config");

const protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Not authorized ,no token found",
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    req.user = await userModel.findById(decoded.id);

    if (!req.user) {
      return res.status(404).json({
        message: "No user found",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = protectRoutes;
