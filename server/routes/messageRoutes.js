const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const sendEmail = require("../utils/emailSender");

// Middleware to check if user is authenticated
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Unauthorized");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new Error("Invalid token");
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).send({
      message: err.message,
    });
  }
};

// Send a new message
router.post("/send", protectRoute, async (req, res) => {
  try {
    const { text } = req.body;
    const fromUser = await User.findById(req.user._id);

    // Create notification for professor
    const professorUser = await User.findOne({ role: "professor" });
    if (professorUser) {
      professorUser.notifications.push({
        type: "message",
        title: "New Message",
        message: `New message from ${fromUser.firstName} ${fromUser.lastName}`,
      });
      await professorUser.save();

      // Send email notification to professor
      const emailOptions = {
        email: professorUser.email,
        subject: "New Student Message",
        text: `You have a new message from ${fromUser.firstName} ${fromUser.lastName}`,
        html: `
          <h3>New Student Message</h3>
          <p>From: ${fromUser.firstName} ${fromUser.lastName}</p>
          <p>Message: ${text}</p>
          <p>Login to respond to this message.</p>
        `,
      };
      await sendEmail(emailOptions);
    }

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Error sending message" });
  }
});

// Send contact form
router.post("/contact/send", protectRoute, async (req, res) => {
  try {
    const { subject, message } = req.body;
    const fromUser = await User.findById(req.user._id);

    // Create notification for professor
    const professorUser = await User.findOne({ role: "professor" });
    if (professorUser) {
      professorUser.notifications.push({
        type: "message",
        title: subject,
        message: `New contact form submission from ${fromUser.firstName} ${fromUser.lastName}`,
      });
      await professorUser.save();

      // Send email notification
      const emailOptions = {
        email: professorUser.email,
        subject: `Contact Form: ${subject}`,
        text: message,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>From:</strong> ${fromUser.firstName} ${fromUser.lastName}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      };
      await sendEmail(emailOptions);
    }

    res.status(200).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ message: "Error submitting contact form" });
  }
});

// Get messages for a user
router.get("/messages", protectRoute, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ notifications: user.notifications });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Error fetching messages" });
  }
});

module.exports = router;
