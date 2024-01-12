const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();
const dbConnect = require("./src/config/dbConfig");
dbConnect();
// Import routes
const authRoutes = require("./src/routes/authRoutes");

// Use middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

// Use routes
app.use("/api/auth", authRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
