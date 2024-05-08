const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  lastName: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  canAccess: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
