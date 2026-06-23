const { Router } = require("express");
const {
  register,
  login,
  getMe,
  logout,
} = require("../controllers/auth.controller");
const protectRoutes = require("../middlewares/auth.middleware");

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/", protectRoutes, getMe);

module.exports = router;
