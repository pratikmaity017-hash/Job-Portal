const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    logo: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const companyModel = mongoose.model("Company", companySchema);

module.exports = companyModel;
