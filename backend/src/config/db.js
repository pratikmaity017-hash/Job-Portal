const mongoose = require("mongoose");
const config = require("../config/config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);

    console.log("Mongodb database is connected successfully with server");
  } catch (err) {
    return;
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;