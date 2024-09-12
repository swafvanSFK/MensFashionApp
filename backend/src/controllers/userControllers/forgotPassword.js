import userModel from "../../models/userModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const forgotPasswordController = async (req, res) => {

  const { email } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10m",
  });

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Reset Password",
    html: `<h1>Reset Your Password</h1>
          <p>Click on the following link to reset your password:</p>
          <a href="http://localhost:5173/reset-password/${token}">http://localhost:5173/reset-password/${token}</a>
          <p>The link will expire in 10 minutes.</p>
          <p>If you didn't request a password reset, please ignore this email.</p>`,
  };

  const senderDetails = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.PASSWORD,
    },
  });

  senderDetails.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res
      .status(200)
      .json({ message: "A link send to your mail to reset the password" ,success : true});
  });
};

export default forgotPasswordController;
