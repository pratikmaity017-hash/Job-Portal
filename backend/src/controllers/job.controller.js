const jobModel = require("../models/job.model");
const companyModel = require("../models/company.model");

const jobCreate = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      experienceLevel,
      position,
      companyId,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !experienceLevel ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const company = await companyModel.findById(companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Ownership check
    if (company.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const job = await jobModel.create({
      title,
      description,
      requirements: requirements.split(",").map((item) => item.trim()),
      salary,
      location,
      experienceLevel,
      position,
      company: companyId,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "job created successfully",
      job: {
        _id: job._id,
        title: job.title,
        company: job.company,
        location: job.location,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  jobCreate,
};
