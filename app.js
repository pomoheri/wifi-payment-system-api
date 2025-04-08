const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const app = express();

require("dotenv").config();

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./routes/auth");
const roleRoutes = require("./routes/role");

app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);

module.exports = app;
