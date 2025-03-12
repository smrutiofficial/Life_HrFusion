const jwt = require("jsonwebtoken");
const User = require("../models/Users.model");
const dotenv = require("dotenv");

dotenv.config();

// Authenticate user via JWT
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Authorize based on roles
const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};


module.exports = {authenticate,authorize}