/*

Email data that we need

1. Email being sent from where 
2. Email being sent to where
3. Subject of the email
4. Body of the email


*/

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

/* 
    1. Create a transporter
    2. Set up the transporter
    3. Send the email

    We are defining the emailOptions object here
*/

dotenv.config();

const emailOptions = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
};

// Send email function that takes in the emailOptions object and the email data

const sendEmail = async (options) => {
  console.log(emailOptions);
  // Create a transporter
  const transporter = nodemailer.createTransport(emailOptions);

  // this is the space where I will send the email

  const emailDataOptions = {
    from: "Learn Link Resource Hub",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  // Set up the transporter
  await transporter.sendMail(emailDataOptions);
};

module.exports = sendEmail;
