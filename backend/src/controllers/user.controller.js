const userModel = require("../models/user.model");

const updateProfile = async (req, res) => {
  try {
    const { fullName, bio, skills } = req.body;

    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (fullName) {
      user.fullName = fullName;
    }

    if (bio) {
      user.profile.bio = bio;
    }

    if (skills) {
      user.profile.skills = skills.split(",").map((skill) => {
        return skill.trim();
      });
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profile: user.profile,
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
  updateProfile,
};
