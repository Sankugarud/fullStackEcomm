const nodemailer = require('nodemailer');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const createTransporter = () => {
  
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
  }
  });
};

const mailOptions = (email, resetToken,protocol,host) => {
  return {
    from: 'sanketgarud@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    text: `To reset your password, click on the following link:${protocol}://${host}/api/v1/auth/password/reset/${resetToken}`,
  };
};

module.exports = { createTransporter, mailOptions };