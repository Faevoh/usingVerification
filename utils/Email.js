const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({path: "./config/config.env"});

const sendEmail = async(options)=>{
    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth: {
            user: process.env.USER,
            pass: process.env.EMAILPASS,
            secure: false
        }
    });
    // console.log(transporter.options)
    // console.log(transporter)

    const mailOptions = {
        from: process.env.user,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail