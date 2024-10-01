const jwt = require("jsonwebtoken");
require("dotenv").config(); // Ensure .env is properly loaded
const { User } = require("../config/db");
const JWT_SECRET = process.env.JWT_SECRET;

const authenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("Cookies", req.cookies);
    console.log("Received token:", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded);

    const user = await User.findById(decoded.id);
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication error:", err);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired." });
    }

    return res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = { authenticated };
