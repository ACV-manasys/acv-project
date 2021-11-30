require('dotenv').config();
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_SYS,
    pass: process.env.NODEMAILER_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// FOR GENERAL USES *****
function ConstructEmail(type, userEmail) {
  let mailContent = {
    from: '',
    to: '',
    subject: '',
    text: '',
  };

  switch (type) {
    case 'activation':
      mailContent.to = userEmail;
      mailContent.subject = 'Activation confirmation';
      mailContent.text = 'Hi there, welcome to join our family';
      mailContent.text += '\n' + 'Your registered account has been activated!';
      break;

    default:
      mailContent.to = process.env.NODEMAILER_ADMIN;
      mailContent.subject = 'New account request';
      mailContent.text = 'Hey there, new account has been created, please go to our app to check and activate it!';
      break;
  }

  mailContent.text += '\n' + 'Go to the log in page or follow this link: ';

  return mailContent;
}

// FUNCTION TO SEND
function sendConfirm(useremail) {
  let mailContent;
  if (useremail != '') {
    mailContent = ConstructEmail('activation', useremail);
  }
  else {
    mailContent = ConstructEmail('confirm', null);
  }
  // Send email
  console.log(mailContent);

  var success = false;
  transporter.sendMail(mailContent, function (error, info) {
    if (error) {
      success = false;
      console.log(error);
    } else {
      success = true;
      console.log(info.response);
    }
    transporter.close();
    return success;
  });
}

module.exports = { sendConfirm }