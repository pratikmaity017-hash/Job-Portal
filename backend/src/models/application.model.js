const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

applicationSchema.index(
  {
    applicant: 1,
    job: 1,
  },
  {
    unique: true,
  },
);

const applicationModel = mongoose.model("Application", applicationSchema);
module.exports = applicationModel;
