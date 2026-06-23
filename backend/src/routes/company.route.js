const { Router } = require("express");
const protectRoutes = require("../middlewares/auth.middleware");
const authorizedRoles = require("../middlewares/role.middleware");
const {
  createCompany,
  getCompany,
  getCompanyById,
  updateCompany,
} = require("../controllers/company.controller");

const router = Router();

router.post("/", protectRoutes, authorizedRoles("recruiter"), createCompany);

router.get("/", protectRoutes, authorizedRoles("recruiter"), getCompany);

router.get("/:id", protectRoutes, authorizedRoles("recruiter"), getCompanyById);

router.patch(
  "/:id/update",
  protectRoutes,
  authorizedRoles("recruiter"),
  updateCompany,
);

module.exports = router;
