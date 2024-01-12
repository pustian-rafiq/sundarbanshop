const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY);
  return token;
};
const secretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};
module.exports = { generateToken };
