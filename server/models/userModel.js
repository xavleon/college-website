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
  role: {
    type: String,
    enum: ["student", "professor", "admin"],
    default: "student",
  },
  studentId: {
    type: String,
    unique: true,
    sparse: true,
  },
  courseSection: {
    type: String,
    required: function () {
      return this.role === "student";
    },
  },
  notifications: [
    {
      type: {
        type: String,
        enum: ["assignment", "message", "announcement"],
        required: true,
      },
      title: String,
      message: String,
      read: {
        type: Boolean,
        default: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  lastActive: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
