require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");

// Connect to the MongoDB database
connectDB();

const app = express();

// Middleware that runs on every request
app.use(cors()); // let the React frontend talk to this API
app.use(express.json()); // read JSON sent in the request body

// A simple route to check the API is alive
app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

// The main feature routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error handler always goes last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
