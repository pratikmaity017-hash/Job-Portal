const { Router } = require("express");

const router = Router();

const {
  applyJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
} = require("../controllers/application.controller");
const protectRoutes = require("../middlewares/auth.middleware");
const authorizedRoles = require("../middlewares/role.middleware");

router.post("/:jobId", protectRoutes, authorizedRoles("candidate"), applyJob);

router.get("/", protectRoutes, authorizedRoles("candidate"), getMyApplications);

router.get(
  "/job/:jobId",
  protectRoutes,
  authorizedRoles("recruiter"),
  getApplicantsForJob,
);

router.patch(
  "/:applicationId/status",
  protectRoutes,
  authorizedRoles("recruiter"),
  updateApplicationStatus,
);

module.exports = router;
