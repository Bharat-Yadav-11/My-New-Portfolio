const nodemailer = require('nodemailer');
require('dotenv').config();

// Validate email format
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',  // Or any other email service (e.g., 'Zoho', 'Outlook')
  auth: {
    user: process.env.GMAIL_USER,  // Your email
    pass: process.env.GMAIL_PASS,  // Your password
  },
  tls: {
    rejectUnauthorized: false,  // For allowing self-signed certificates if needed
  },
});

// Function to send email and auto-reply
const sendEmail = async ({ name, email, phone, subject, message }) => {
  if (!validateEmail(email)) {
    throw new Error('Invalid email address.');
  }

  // Email sent to you (owner)
  const mailOptions = {
    from: process.env.GMAIL_USER, // Your email address
    replyTo: email,  // Sender's email
    to: process.env.GMAIL_USER,  // Your email address
    subject: `Contact Form Submission from ${name}\n Subject: ${subject}`,
    text: `You have a new message from ${name} (${email}, Phone: ${phone}):\n\n${message}`,
  };

  // Auto-reply email to the sender
  const autoReplyOptions = {
    from: process.env.GMAIL_USER,  // Your email address
    to: email,  // Sender's email address
    subject: `Thank you for contacting me!`,
    text: `Hello ${name},\n\nThank you for reaching out. I have received your message and will get back to you shortly.\n\nBest regards,\nBharat Bhushan`,
  };

  try {
    // Send email to yourself
    await transporter.sendMail(mailOptions);

    // Send auto-reply to the sender
    await transporter.sendMail(autoReplyOptions);

    return 'Emails sent successfully';
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendEmail,
};
