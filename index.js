const nodemailer = require('nodemailer');
const express = require('express');
const app = express();

app.use(express.json());

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,  // Environment variable for Gmail user
    pass: process.env.GMAIL_PASS   // Environment variable for Gmail password
  }
});

let lightStatus = 'OFF';

app.post('/api/update', (req, res) => {
  const { status } = req.body;
  lightStatus = status;

  sendEmailNotification(status);
  res.json({ message: `Light turned ${status}` });
});

function sendEmailNotification(status) {
  let mailOptions = {
    from: 'williamsaranas@gmail.com',
    to: 'marjunbasadre21@gmail.com',  // The email where notifications are sent
    subject: `Light is now ${status}`,
    text: `The light has been turned ${status}.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = app;
