const express = require("express");
const router = express.Router();
const Assignment = require("../models/assignmentModel");
const AssignmentSubmission = require("../models/assignmentSubmissionModel");
const User = require("../models/userModel");
const auth = require("../middleware/auth");

// Get all assignments
router.get("/", auth, async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ dueDate: 1 });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new assignment (professor only)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "professor") {
    return res
      .status(403)
      .json({ message: "Only professors can create assignments" });
  }

  const assignment = new Assignment({
    ...req.body,
    createdBy: req.user._id,
  });

  try {
    const newAssignment = await assignment.save();
    // Create submission placeholders for all students
    const students = await User.find({ role: "student" });
    await Promise.all(
      students.map((student) =>
        new AssignmentSubmission({
          assignment: newAssignment._id,
          student: student._id,
        }).save()
      )
    );
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update assignment (professor only)
router.put("/:id", auth, async (req, res) => {
  if (req.user.role !== "professor") {
    return res
      .status(403)
      .json({ message: "Only professors can update assignments" });
  }

  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    Object.assign(assignment, req.body);
    assignment.updatedAt = Date.now();
    const updatedAssignment = await assignment.save();
    res.json(updatedAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete assignment (professor only)
router.delete("/:id", auth, async (req, res) => {
  if (req.user.role !== "professor") {
    return res
      .status(403)
      .json({ message: "Only professors can delete assignments" });
  }

  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    await AssignmentSubmission.deleteMany({ assignment: req.params.id });
    await assignment.remove();
    res.json({ message: "Assignment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get assignment submissions
router.get("/:id/submissions", auth, async (req, res) => {
  if (req.user.role !== "professor") {
    return res
      .status(403)
      .json({ message: "Only professors can view all submissions" });
  }

  try {
    const submissions = await AssignmentSubmission.find({
      assignment: req.params.id,
    })
      .populate("student", "name email")
      .sort("student.name");
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update submission grade (professor only)
router.put("/submissions/:submissionId", auth, async (req, res) => {
  if (req.user.role !== "professor") {
    return res
      .status(403)
      .json({ message: "Only professors can update grades" });
  }

  try {
    const submission = await AssignmentSubmission.findById(
      req.params.submissionId
    );
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    submission.grade = req.body.grade;
    submission.status = "graded";
    const updatedSubmission = await submission.save();
    res.json(updatedSubmission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Student submits assignment
router.post("/:id/submit", auth, async (req, res) => {
  if (req.user.role !== "student") {
    return res
      .status(403)
      .json({ message: "Only students can submit assignments" });
  }

  try {
    const submission = await AssignmentSubmission.findOne({
      assignment: req.params.id,
      student: req.user._id,
    });

    if (!submission) {
      return res.status(404).json({ message: "Submission record not found" });
    }

    // Check if past due date
    const assignment = await Assignment.findById(req.params.id);
    const isLate = new Date() > new Date(assignment.dueDate);

    submission.status = isLate ? "late" : "submitted";
    submission.submissionDate = Date.now();
    if (req.body.attachments) {
      submission.attachments = req.body.attachments;
    }

    const updatedSubmission = await submission.save();
    res.json(updatedSubmission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Student gets their own submission
router.get("/:id/my-submission", auth, async (req, res) => {
  if (req.user.role !== "student") {
    return res
      .status(403)
      .json({ message: "Only students can view their submissions" });
  }

  try {
    const submission = await AssignmentSubmission.findOne({
      assignment: req.params.id,
      student: req.user._id,
    });

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
