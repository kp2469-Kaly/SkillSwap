const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const skillRoutes = require("./routes/skills");
const sessionRoutes = require("./routes/sessions");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to SkillSwap API");
});

module.exports = app;
