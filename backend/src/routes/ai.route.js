const { Router } = require("express");
const { matchResume } = require("../controllers/ai.controller");

const router = Router();

router.post("/match-resume",matchResume);
module.exports = router;
