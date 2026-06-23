const applicationModel = require("../models/application.model");
const jobModel = require("../models/job.model");

const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check job exists
    const job = await jobModel.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check already applied
    const existingApplication = await applicationModel.findOne({
      applicant: req.user._id,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // Create application
    const application = await applicationModel.create({
      applicant: req.user._id,
      job: jobId,
    });

    // Add application to job
    job.applications.push(application._id);

    await job.save();

    return res.status(201).json({
      success: true,
      message: "Applied successfully",
      application,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await applicationModel
      .find({
        applicant: req.user.id,
      })
      .populate({
        path: "job",
        populate: {
          path: "company",
          select: "name location",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await jobModel.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Ownership check
    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const applications = await applicationModel
      .find({
        job: jobId,
      })
      .populate("applicant", "fullName email profile")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const allowedStatuses = ["pending", "accepted", "rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be pending, accepted, or rejected",
      });
    }

    const application = await applicationModel
      .findById(applicationId)
      .populate("job");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Ownership check
    if (application.job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    if (application.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Application status already finalized",
      });
    }

    application.status = status;

    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application status updated",
      application,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  applyJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
};
