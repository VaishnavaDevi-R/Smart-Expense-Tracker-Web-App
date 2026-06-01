console.log("SERVER FILE LOADED");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

const transactionRoutes =
require("./routes/transactionRoutes");

const dashboardRoutes =
require("./routes/dashboardRoutes");

const budgetRoutes =
require("./routes/budgetRoutes");

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);

app.use(
  "/api/transactions",
  transactionRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/budgets",
  budgetRoutes
);
// Default Route
app.get("/", (req, res) => {
  res.send("Smart Expense Tracker API Running");
});

// Server
const PORT = process.env.PORT || 5000;

app.get("/test", (req, res) => {
  res.send("Test Route Working");
});

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});