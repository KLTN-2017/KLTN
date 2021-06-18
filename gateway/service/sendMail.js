const { email, passwd } = require("../config/index");
const nodemailer = require("nodemailer");

const sendMailGmail = async (listMail, subject, body) => {
    const mail = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: passwd,
      },
    });
    const mailOptions = {
      from: email,
      to: listMail,
      subject,
      html: body,
    };
    const result = await mail.sendMail(mailOptions);
    return result;
};


module.exports = sendMailGmail;
