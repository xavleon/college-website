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
  professorRequest: {
    status: {
      type: String,
      enum: ["none", "pending", "approved", "rejected"],
      default: "none",
    },
    requestDate: Date,
    department: String,
    credentials: String,
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    approvalDate: Date,
  },
  inviteToken: {
    type: String,
    sparse: true,
  },
  studentId: {
    type: String,
    unique: true,
    sparse: true,
  },
  courseSection: {
    type: String,
    default: "N/A",
  },
  notifications: [
    {
      type: {
        type: String,
        enum: ["assignment", "message", "announcement", "role_request"],
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
