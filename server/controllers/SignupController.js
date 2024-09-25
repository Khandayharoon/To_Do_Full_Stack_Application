require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../config/db");
const zod = require("zod");

// User validation schema
const userZodSchema = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must contain at least one number.",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain at least one lowercase letter.",
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: "Password must contain at least one special character.",
    }),
});

// Function to generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id}, process.env.JWT_SECRET, {expiresIn: '3d' })};

// Signup function
const SignUp = async (req, res) => {
  // Validate user data
  const parseUserData = userZodSchema.safeParse(req.body);
  if (!parseUserData.success) {
    return res
      .status(400)
      .json({ errors: parseUserData.error.flatten().fieldErrors });
  }

  const { username, email, password } = parseUserData.data;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Create a new user
    const newUser = await User.create({ username, email, password });

    // Generate a JWT token
    const token = generateToken(newUser._id);

    // Send response with user details and token
    res.status(201).json({
      message: "User created successfully",
      user: { username, email }, // Do not expose the password
      token : `Bearer ${token}`
    });
  } catch (e) {
    console.error("Error signing up user:", e);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { SignUp, generateToken};
