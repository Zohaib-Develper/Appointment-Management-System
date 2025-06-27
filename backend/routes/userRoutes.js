const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  refreshToken,
  logoutUser,
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/refresh-token", refreshToken);
router.get("/me", authMiddleware, getMe);

module.exports = router;
