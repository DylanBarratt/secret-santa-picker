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

function checkWorked(peoples) {
    peoples.forEach((ele) => {
        if (ele.name == ele.recipient && ele.recipient != undefined) {
            return false;
        }
    });
    return true;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function moveForwardOne(array) {
    var newArr = [];
    newArr[0] = array[array.length - 1]; //put the last element in the first spot
    //put every subsequent element in the next spots
    for (i = 0; i < array.length - 1; i++) {
        newArr[i + 1] = array[i];
    }
    return newArr;
}

var p = shuffle(JSON.parse(fs.readFileSync("emails.json", { encoding: "utf8", flag: "r" })));
var dupe = moveForwardOne(p);

for (i = 0; i < p.length; i++) {
    p[i].recipient = dupe[i].name;
}

if (checkWorked(p)) {
    p.forEach((ele) => {
        const img1Link =
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thesprucecrafts.com%2Ffree-santa-clip-art-1356291&psig=AOvVaw0ntydLN2tINTzKfjHn6r3b&ust=1668071379442000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCLjlxqLgoPsCFQAAAAAdAAAAABAJ";
        var mailOptions = {
            from: process.env.USER_EMAIL,
            to: ele.email,
            subject: process.env.SUBJECT_LINE,
            html: "<img src=" + img1Link + "/><br/><h2> Hello " + ele.name + "!</h2>" + "<h4>you have been assigned <i>" + ele.recipient + ".</i><h4>",
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    });
}
