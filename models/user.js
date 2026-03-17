const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true, // 🔥 prevents duplicate emails
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["Admin", "Student", "Visitor"],
    default: "Student", // 🔥 good practice
  },
});

module.exports = mongoose.model("User", UserSchema);