require("dotenv").config();
const nodemailer = require("nodemailer");
const fs = require("fs");

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    },
});

const emails = fs.readFileSync("emails.txt", { encoding: "utf8", flag: "r" });
const emailsArray = emails.split("\n");

emailsArray.forEach((ele) => {
    var mailOptions = {
        from: process.env.USER_EMAIL,
        to: ele,
        subject: "Sending Email using Node.js",
        text: "Hello " + ele,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
});
