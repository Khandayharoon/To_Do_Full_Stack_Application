const jwt = require("jsonwebtoken");
require("dotenv").config(); // Make sure to invoke config()
const { User } = require("../config/db");
const JWT_SECRET = process.env.JWT_SECRET;

const authenticated = async (req, res, next) => {
  try {
    /*const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    console.log("Token:", token);*/
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }
    console.log(req.cookies);
    const decode = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decode);
    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = { authenticated };
