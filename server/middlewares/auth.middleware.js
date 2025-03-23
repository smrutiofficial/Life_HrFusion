const jwt = require("jsonwebtoken");
const User = require("../models/Users.model");
const dotenv = require("dotenv");

dotenv.config();

// Middleware to authenticate user via JWT
// const authenticate = async (req, res, next) => {
//   // Get token from the header
//   const token = req.header("token");

//   // Check if no token
//   if (!token) {
//     return res.status(401).json({ msg: "No token, authorization denied" });
//   }
//   console.log(token);

//   // Verify token
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // const decoded = jwt.verify(token, "secretToken");
//     console.log(decoded);
    
//     req.user = decoded.user; // Attach the user object from the token payload
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token is not valid" });
//   }
// };


const authenticate = async (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  console.log("Received Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    req.user = decoded;  // 🔥 Ensure `req.user` is correctly assigned
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// Middleware to authorize based on roles (e.g., Admin, User)
const authorize = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = { authenticate, authorize };
