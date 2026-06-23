const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");
const roleRoutes = require("./routes/user.route");
const companyRoutes = require("./routes/company.route");
const jobRoutes = require("./routes/job.route");
const applicationRoutes = require("./routes/application.route");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", roleRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/application", applicationRoutes);

module.exports = app;
