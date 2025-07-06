const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const sendEmail = require("../utils/emailSender");

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      throw new Error("Unauthorized: Only admins can perform this action");
    }
    next();
  } catch (err) {
    res.status(401).send({
      message: err.message,
    });
  }
};

// Submit professor request
router.post("/request", async (req, res) => {
  try {
    const { department, credentials } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (user.role === "professor") {
      throw new Error("You are already a professor");
    }

    if (user.professorRequest.status === "pending") {
      throw new Error("You already have a pending request");
    }

    user.professorRequest = {
      status: "pending",
      requestDate: new Date(),
      department,
      credentials,
    };

    await user.save();

    // Notify admins about the new request
    const admins = await User.find({ role: "admin" });
    for (let admin of admins) {
      admin.notifications.push({
        type: "role_request",
        title: "New Professor Request",
        message: `${user.firstName} ${user.lastName} has requested professor access`,
      });
      await admin.save();
    }

    res.status(200).send({
      message: "Professor request submitted successfully",
      request: user.professorRequest,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

// Get all professor requests (admin only)
router.get("/requests", isAdmin, async (req, res) => {
  try {
    const requests = await User.find({
      "professorRequest.status": "pending",
    }).select("firstName lastName email professorRequest createdAt");

    res.status(200).send(requests);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

// Approve/reject professor request (admin only)
router.put("/request/:userId", isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const userId = req.params.userId;

    if (!["approved", "rejected"].includes(status)) {
      throw new Error("Invalid status");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.professorRequest.status = status;
    user.professorRequest.approvedBy = req.user._id;
    user.professorRequest.approvalDate = new Date();

    if (status === "approved") {
      user.role = "professor";
    }

    await user.save();

    // Send email notification to user
    const emailSubject =
      status === "approved"
        ? "Professor Access Request Approved"
        : "Professor Access Request Update";

    const emailMessage =
      status === "approved"
        ? `Congratulations! Your request for professor access has been approved. You now have full professor privileges on the platform.`
        : `Your request for professor access has been reviewed. Unfortunately, we cannot grant professor access at this time.`;

    await sendEmail({
      email: user.email,
      subject: emailSubject,
      text: emailMessage,
      html: `<h2>${emailSubject}</h2><p>${emailMessage}</p>`,
    });

    // Add notification for the user
    user.notifications.push({
      type: "role_request",
      title: emailSubject,
      message: emailMessage,
    });
    await user.save();

    res.status(200).send({
      message: `Professor request ${status} successfully`,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        professorRequest: user.professorRequest,
      },
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

module.exports = router;
