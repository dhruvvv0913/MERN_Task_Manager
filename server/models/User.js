const mongoose = require("mongoose");

// Describes what a user looks like in the database
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // two users cannot share the same email
    },
    password: {
      type: String,
      required: true, // this stores the hashed password, never the plain one
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

module.exports = mongoose.model("User", userSchema);
