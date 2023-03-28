const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  emailFrom: "the email address you want to send from",
  host: "smtp.gmail.com", // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: "SMTP", // default is SMTP.
  auth: {
    user: "the email address you want to send from", // should be gmail address
    pass: "the app password you generated",
  },
});

// setup email data with unicode symbols
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: "the email address you want to send from", // should be gmail address
    to,
    subject,
    text,
  };

  console.log(mailOptions);

  // send mail with defined transport object

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
