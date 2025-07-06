const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
  },
  feedback: {
    type: String,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  gradedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gradedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a compound index to ensure a student can only have one grade per assignment
gradeSchema.index({ student: 1, assignment: 1 }, { unique: true });

module.exports = mongoose.model("Grade", gradeSchema);
