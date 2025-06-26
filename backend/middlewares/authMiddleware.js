const jwt = require("jsonwebtoken");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

const authMiddleware = catchAsync(async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token)
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  const user = await User.findById(decoded.id).select("-password");

  if (!user)
    return res.status(401).json({ message: "Unauthorized: User not found" });

  req.user = user;
  next();
});

module.exports = authMiddleware;
