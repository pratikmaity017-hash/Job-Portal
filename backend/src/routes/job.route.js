const { Router } = require("express");
const protectRoutes = require("../middlewares/auth.middleware");
const authorizedRoles = require("../middlewares/role.middleware");
const {
  jobCreate,
  getRecruiterJob,
  getJobById,
  updateJob,
  getAllJobs,
} = require("../controllers/job.controller");

const router = Router();

router.post("/", protectRoutes, authorizedRoles("recruiter"), jobCreate);

router.get("/", protectRoutes, authorizedRoles("recruiter"), getRecruiterJob);

router.get("/all", protectRoutes, authorizedRoles("recruiter"), getAllJobs);

router.get("/:id", protectRoutes, authorizedRoles("recruiter"), getJobById);

router.patch("/:id", protectRoutes, authorizedRoles("recruiter"), updateJob);

module.exports = router;
