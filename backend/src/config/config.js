require("dotenv").config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defiend");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET isnot defiend");
}

const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
};

module.exports = config;
