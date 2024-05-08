const express = require("express");
const sendEmail = require("../utils/emailSender");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const crypto = require("crypto");
const dotenv = require("dotenv");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const router = express.Router();
dotenv.config();

const User = require("../models/userModel");
const { log } = require("console");

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

router.post("/signup", async (req, res) => {
  try {
    // 1. Get user input (body data)
    const data = req.body;
    // 3. Check if user already exists
    const user = await User.findOne({ email: data.email });
    if (user) {
      throw new Error("User already exists");
    }

    // 3. validate passwords
    if (data.password !== data.passwordConfirm) {
      throw new Error("Passwords do not match");
    }

    // 4. Hash the password

    const hashPassword = await bcrypt.hash(data.password, 10);
    data.password = hashPassword;

    // 4. Create a new user
    const newUser = new User({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
    await newUser.save();

    // Send email to user
    // we need options from the email.js file

    /*   const emailDataOptions = {
    from: "Learn Link Resource Hub",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  }; */

    const firstName = capitalizeFirstLetter(data.firstName);

    const htmlEmail = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Learn Link Resource Hub</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .email-container {
              background-color: #ffffff;
              margin: 20px auto;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              max-width: 600px;
          }
          .header {
              text-align: center;
              padding: 20px 0;
              background-color: #111827;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
          }
          .header h1 {
              color: #ffffff;
              margin: 0;
          }
          .content {
              text-align: center;
              padding: 20px;
          }
          .content p {
              color: #666666;
              line-height: 1.5;
          }
          .footer {
              text-align: center;
              padding: 20px 0;
              color: #999999;
              font-size: 12px;
              background-color: #f4f4f4;
              border-bottom-left-radius: 10px;
              border-bottom-right-radius: 10px;
          }
          .footer a {
              color: #0066cc;
              text-decoration: none;
          }
          .button {
              display: inline-block;
              padding: 10px 20px;
              margin: 20px 0;
              color: #ffffff;
              background-color: #111827;
              border-radius: 5px;
              text-decoration: none;
              font-weight: bold;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="header">
              <h1>Welcome to Learn Link Resource Hub</h1>
          </div>
          <div class="content">
              <p> Hello ${firstName},</p>
              <p>Thank you for joining Learn Link Resource Hub! We are thrilled to have you as part of our community.</p>
              <p>Our mission is to provide you with the best resources and tools to support your learning journey. Whether you're looking to enhance your skills, discover new knowledge, or connect with like-minded individuals, we are here to help.</p>
              <p>Feel free to explore our platform and take advantage of all the resources available to you. If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>
              <a href="https://www.learnlinkresourcehub.com" class="button">Explore Now</a>
              <p>Welcome aboard!</p>
              <p>Best regards,</p>
              <p>The Learn Link Resource Hub Team</p>
          </div>
          <div class="footer">
              <p>&copy; 2024 Learn Link Resource Hub. All rights reserved.</p>
              <p><a href="https://www.learnlinkresourcehub.com">Visit our website</a> | <a href="mailto:support@learnlinkresourcehub.com">Contact Support</a></p>
          </div>
      </div>
  </body>
  </html>
  `;

    const options = {
      email: data.email,
      subject: "Welcome to LearnLink",
      text: "Hello",
      html: htmlEmail,
    };

    await sendEmail(options);

    // 5. send back the user
    res.status(201).send({
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    //1 Get user input
    const data = req.body;
    //2 Check if user exists
    const user = await User.findOne({ email: data.email });
    //3 Check if password is correct
    //console.log(data, user);

    // 3. check if hash password is correct

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!user || !isMatch) {
      throw new Error("Invalid credentials");
    }
    //4 Send back the user

    // Generate a token

    /// 1. Data
    // 2. Secret key
    // 3. Options

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).send({
      message: "Login successful",
      user,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

router.post("/forgot-password", protectRoute, async (req, res) => {
  try {
    const userEmail = req.body.email;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      res.status(404).json({
        error: "User not found",
      });
      return;
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // const options = {
    //   email: user.email,
    //   subject: "Password Reset",
    //   text: "Hello",
    //   html: `<p>Click <a href="http://localhost:3000/reset-password/${user._id}">here</a> to reset your password</p>`,
    // };

    // await sendEmail(options);

    res.status(200).json({
      message: "Password reset link sent",
      resetToken,
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: err.message,
    });
  }
});
module.exports = router;
