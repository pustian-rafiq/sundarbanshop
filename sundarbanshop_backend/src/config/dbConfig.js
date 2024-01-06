const mongoose = require("mongoose");

const dbConnect = () => {
  try {
    const connection = mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected success");
  } catch (error) {
    console.log("error: " + error);
  }
};
module.exports = dbConnect;
