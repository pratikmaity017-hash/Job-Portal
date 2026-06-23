const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email should be unique"],
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["candidate", "recruiter"],
      required: true,
    },

    profile: {
      bio: {
        type: String,
        default: "",
      },
      skills: [
        {
          type: String,
        },
      ],

      resume: {
        type: String,
        default: "",
      },
      resumeOriginalName: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
