const nodemailer = require('nodemailer');
require('dotenv').config();

// Validate email format
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Function to send email
const sendEmail = async ({ name, email, phone, subject, message }) => {
  if (!validateEmail(email)) {
    throw new Error('Invalid email address.');
  }

  const mailOptions = {
    from: process.env.GMAIL_USER, // Your email address
    replyTo: email, // The sender's email address
    to: process.env.GMAIL_USER, // Your email address
    subject: `New Contact: ${subject} from ${name}`,
    text: `You have a new message from ${name} (${email}, Phone: ${phone}):\n\n${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info.response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendEmail,
};
