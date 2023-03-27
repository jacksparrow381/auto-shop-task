const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  emailFrom: "baleesha01@gmail.com",
  host: "smtp.gmail.com", // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: "SMTP", // default is SMTP.
  auth: {
    user: "baleesha01@gmail.com",
    pass: "runjhdyytzdcfdck",
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
