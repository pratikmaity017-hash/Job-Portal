const { Router } = require("express");
const protectRoutes = require("../middlewares/auth.middleware");
const authorizedRoles = require("../middlewares/role.middleware");
const { jobCreate } = require("../controllers/job.controller");

const router = Router();

router.post("/", protectRoutes, authorizedRoles("recruiter"), jobCreate);

module.exports = router;
