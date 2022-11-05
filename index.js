require("dotenv").config();
var nodemailer = require("nodemailer");

console.log(process.env.USER_EMAIL);

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    },
});

var mailOptions = {
    from: process.env.USER_EMAIL,
    to: "dylanbarratt03@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log("Email sent: " + info.response);
    }
});
