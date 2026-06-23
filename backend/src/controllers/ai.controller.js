const { matchResumeAI } = require("../services/ai.service");

const matchResume = async (req, res) => {
  try {
    const { resume, job_description } = req.body;

    const result = await matchResumeAI(resume, job_description);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "AI service error",
      error: error.message,
    });
  }
};

module.exports = {
  matchResume,
};
