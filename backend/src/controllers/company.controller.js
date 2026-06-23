const companyModel = require("../models/company.model");

const createCompany = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(404).json({
        success: false,
        message: "company name is required",
      });
    }

    const companyExists = await companyModel.findOne({ name: name.trim() });

    if (companyExists) {
      return res.status(400).json({
        success: false,
        message: "Company already exists",
      });
    }

    const company = await companyModel.create({
      name,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Company created successfully",
      company,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getCompany = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const companies = await companyModel.find({
      createdBy: req.user._id,
      name: {
        $regex: keyword,
        $options: "i",
      },
    });

    return res.status(200).json({
      success: true,
      companies,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const company = await companyModel.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "No company found",
      });
    }

    return res.status(200).json({
      success: true,
      company,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const company = await companyModel.findById(req.params.id);

    if (company.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "No company found",
      });
    }

    company.name = name || company.name;

    company.description = description || company.description;

    company.website = website || company.website;

    company.location = location || company.location;

    await company.save();

    return res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = {
  createCompany,
  getCompany,
  getCompanyById,
  updateCompany,
};
