// routes/userRouter.js
const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  refreshToken,
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.get("/me", authMiddleware, getMe);

module.exports = router;
