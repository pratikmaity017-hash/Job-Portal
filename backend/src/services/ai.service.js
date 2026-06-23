const axios = require("axios");

const AI_URL = "http://localhost:5000";

const matchResumeAI = async (resume, job_description) => {
  const response = await axios.post(`${AI_URL}/match`, {
    resume,
    job_description,
  });

  return response.data;
};

module.exports = {
  matchResumeAI,
};
