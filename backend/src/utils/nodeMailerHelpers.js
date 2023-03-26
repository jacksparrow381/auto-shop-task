const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "baleesha01@gmail.com",
    pass: "wkxdushoenqweofp",
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: "baleesha01@gmail.com",
    to,
    subject,
    text,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
