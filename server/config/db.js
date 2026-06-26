const mongoose = require("mongoose");

// Connect to the MongoDB database using the URL kept in the .env file
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // stop the app if the database cannot be reached
  }
}

module.exports = connectDB;
