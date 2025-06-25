const catchAsync = require("../utils/catchAsync");

const roleMiddleware = (...roles) =>
  catchAsync(async (req, res, next) => {
    if (!req.user)
      return res
        .status(401)
        .json({ message: "Unauthorized: No user attached" });

    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden: Access denied" });

    next();
  });

module.exports = roleMiddleware;
