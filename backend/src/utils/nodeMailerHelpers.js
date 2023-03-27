const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "baleesha01@gmail.com",
    pass: "wkxdushoenqweofp",
  },
});

// setup email data with unicode symbols
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: "baleesha01@gmail.com",
    to,
    subject,
    text,
  };

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
