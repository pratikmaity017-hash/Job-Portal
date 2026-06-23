const { Router } = require("express");
const protectedRouter = require("../middlewares/auth.middleware");
const authorizedRoles = require("../middlewares/role.middleware");
const { updateProfile } = require("../controllers/user.controller");
const uploadResume = require("../middlewares/multer.middleware");

const router = Router();

router.get(
  "/recruiter-only",
  protectedRouter,
  authorizedRoles("recruiter"),
  (req, res) => {
    return res.status(200).json({
      soccess: true,
      message: "Wellcome recruiter",
    });
  },
);

router.patch(
  "/profile/update",
  protectedRouter,
  uploadResume.single("resume"),
  updateProfile,
);

module.exports = router;
