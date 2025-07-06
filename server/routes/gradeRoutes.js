const express = require("express");
const router = express.Router();
const Grade = require("../models/gradeModel");
const Assignment = require("../models/assignmentModel");
const User = require("../models/userModel");

// Middleware to check if user is a professor
const isProfessor = async (req, res, next) => {
  try {
    if (req.user.role !== "professor" && req.user.role !== "admin") {
      throw new Error("Unauthorized: Only professors can perform this action");
    }
    next();
  } catch (err) {
    res.status(401).send({
      message: err.message,
    });
  }
};

// Create a new grade (professor only)
router.post("/", isProfessor, async (req, res) => {
  try {
    const { studentId, assignmentId, score, feedback } = req.body;

    // Verify student exists
    const student = await User.findById(studentId);
    if (!student || student.role !== "student") {
      throw new Error("Invalid student ID");
    }

    // Verify assignment exists
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      throw new Error("Invalid assignment ID");
    }

    // Create grade
    const grade = new Grade({
      student: studentId,
      assignment: assignmentId,
      score,
      feedback,
      gradedBy: req.user._id,
    });

    await grade.save();

    res.status(201).send({
      message: "Grade created successfully",
      grade,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

// Get grades for a specific student (student can only view their own grades)
router.get("/student/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Students can only view their own grades
    if (req.user.role === "student" && req.user._id.toString() !== studentId) {
      throw new Error("Unauthorized: You can only view your own grades");
    }

    const grades = await Grade.find({ student: studentId })
      .populate("assignment")
      .populate("gradedBy", "firstName lastName");

    res.status(200).send(grades);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

// Get all grades for a specific assignment (professor only)
router.get("/assignment/:assignmentId", isProfessor, async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;

    const grades = await Grade.find({ assignment: assignmentId })
      .populate("student", "firstName lastName email")
      .populate("gradedBy", "firstName lastName");

    res.status(200).send(grades);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

// Update a grade (professor only)
router.put("/:gradeId", isProfessor, async (req, res) => {
  try {
    const { score, feedback } = req.body;
    const gradeId = req.params.gradeId;

    const grade = await Grade.findByIdAndUpdate(
      gradeId,
      {
        score,
        feedback,
        gradedBy: req.user._id,
        gradedAt: Date.now(),
      },
      { new: true }
    );

    if (!grade) {
      throw new Error("Grade not found");
    }

    res.status(200).send({
      message: "Grade updated successfully",
      grade,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

module.exports = router;
