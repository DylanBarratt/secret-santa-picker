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

const emails = JSON.parse(fs.readFileSync("emails.json", { encoding: "utf8", flag: "r" }));

emails.forEach((ele) => {
    var mailOptions = {
        from: process.env.USER_EMAIL,
        to: ele.email,
        subject: "Sending Email using Node.js",
        text: "Hello " + ele.name,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
});
