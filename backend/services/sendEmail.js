const nodemailer = require("nodemailer");

async function sendEmail({userName,userEmail,userText}) {
  let transporter = nodemailer.createTransport({
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER_EMAIL,
      pass: process.env.NODEMAILER_USER_PASSWORD, 
    },
  });

  const emailMessage = 
  `<h1>Hello Friend!</h1>
  <p>You got an email from ${userName} (${userEmail})</p>
  <p>Text of the message ${userText}</p>`;

  const emailOptions = {
    from: "annagubar.work@meta.ua", // sender address
    to: "annagubar.work@gmail.com", // list of receivers
    subject: "Important news", // Subject line
    text: "Read it immediately", // plain text body
    html: emailMessage, // html body
  };

  let info = await transporter.sendMail(emailOptions);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = sendEmail;
