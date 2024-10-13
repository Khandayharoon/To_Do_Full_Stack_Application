const jwt = require("jsonwebtoken");
require("dotenv").config(); // Ensure .env is properly loaded
const { User } = require("../config/db");
const JWT_SECRET = process.env.JWT_SECRET;

const authenticated = async (req, res, next) => {
  try {
    let token;

    // 1. First, check if the token is in the Authorization header
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
      // console.log(authHeader);
      // console.log("header Token", token);
    } else {
      // 2. Fallback to cookie-based token if header is not present
      token = req.cookies.token;
      // console.log("Cookies Token", token);
    }

    // Log token for debugging
    // console.log("Received token:", token);

    // 3. Check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    // 4. Verify token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log("Decoded token:", decoded);

    // 5. Find the user associated with the token
    const user = await User.findById(decoded.id);
    // console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // 6. Attach user to the request object and call next middleware
    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication error:", err);

    // Handle specific errors like expired tokens
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired." });
    }

    // Generic error response
    return res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = { authenticated };
