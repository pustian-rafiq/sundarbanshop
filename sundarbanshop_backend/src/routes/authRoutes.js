const {
  register,
  login,
  verifyToken,
} = require("../controllers/authController");

const router = require("express").Router();

router.post("/register", register);
router.get("/verify/:token", verifyToken);
router.post("/login", login);

module.exports = router;
