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

const getRecruiterJob = async (req, res) => {
  try {
    const jobs = await jobModel
      .find({
        createdBy: req.user._id,
      })
      .populate("company", "name")
      .sort({ createAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      count: jobs.length,
      jobs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await jobModel
      .findById(req.params.id)
      .populate("company", "name description website location");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      experienceLevel,
      position,
    } = req.body;

    const job = await jobModel.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    job.title = title || job.title;
    job.description = description || job.description;

    if (requirements) {
      job.requirements = requirements.split(",").map((item) => item.trim());
    }

    job.salary = salary || job.salary;
    job.location = location || job.location;
    job.experienceLevel = experienceLevel || job.experienceLevel;
    job.position = position || job.position;

    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const jobs = await jobModel
      .find({
        title: {
          $regex: keyword,
          $options: "i",
        },
      })
      .populate("company", "name location")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
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
  getRecruiterJob,
  getJobById,
  updateJob,
  getAllJobs
};
