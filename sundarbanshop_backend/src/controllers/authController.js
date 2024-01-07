const User = require("../models/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    // check if the user already registered
    const existingUser = await User.find({ email });
    if (existingUser.email === email) {
      return res
        .status(400)
        .send({ message: "Already registered using this email address" });
    }

    // create a new user
    const newUser = new User({ name, email, phone, password });

    //generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the use to database
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registration successfull. Please verify your email",
      user: newUser,
    });
    //send verification email to the user
    sendVerificationEmail(newUser.email, newUser.verificationToken);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Registration failed",
    });
  }
};

const verifyToken = async (req, res) => {
  try {
    const token = req.params.token;

    //find the user with the given token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    //mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email Verificatioion Failed" });
  }
};
const login = (req, res, next) => {};

const sendVerificationEmail = async (email, verificationToken) => {
  //create a  nodemailer transporter
  const transporter = nodemailer.createTransport({
    //configure the email service or SMTP details here
    service: "gmail",
    auth: {
      user: "sundarbanshop.com@gmail.com",
      pass: "yxybukrqrxuspvfd",
    },
  });

  //compose the email message
  const mailOptions = {
    from: "sundarbanshop.com",
    to: email,
    subject: "Email verification",
    text: `Please click the following link to verify your email: http://localhost:5000/api/auth/verify/${verificationToken}`,
  };

  //send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};
module.exports = {
  register,
  login,
  verifyToken,
};
