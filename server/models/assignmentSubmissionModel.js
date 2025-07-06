const mongoose = require("mongoose");

const assignmentSubmissionSchema = new mongoose.Schema({
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["submitted", "late", "not_submitted", "graded"],
    default: "not_submitted",
  },
  grade: {
    type: Number,
    min: 0,
  },
  feedback: {
    type: String,
  },
  attachments: [
    {
      fileName: String,
      fileUrl: String,
      uploadDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  comments: [
    {
      text: String,
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Create a compound index to ensure a student can only have one submission per assignment
assignmentSubmissionSchema.index(
  { assignment: 1, student: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "AssignmentSubmission",
  assignmentSubmissionSchema
);
