// app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

// Import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const skillRoutes = require("./routes/skills");
const sessionRoutes = require("./routes/sessions");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/sessions", sessionRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to SkillSwap API");
});

// ✅ Export app for testing
module.exports = app;
