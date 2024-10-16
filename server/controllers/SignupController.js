require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../config/db");
const zod = require("zod");
const bcrypt = require("bcryptjs");

// User validation schema
const userZodSchema = zod.object({
  firstName: zod.string(),
  email: zod.string().email(),
  // password: zod
  //   .string()
  //   .min(8, { message: "Password must be at least 8 characters long." })
  //   .refine((val) => /[A-Z]/.test(val), {
  //     message: "Password must contain at least one uppercase letter.",
  //   })
  //   .refine((val) => /[0-9]/.test(val), {
  //     message: "Password must contain at least one number.",
  //   })
  //   .refine((val) => /[a-z]/.test(val), {
  //     message: "Password must contain at least one lowercase letter.",
  //   })
  //   .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
  //     message: "Password must contain at least one special character.",
  //   }),
  password: zod.string().min(8),
});

// Function to generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// Signup function
const SignUp = async (req, res) => {
  // Validate user data
  const parseUserData = userZodSchema.safeParse(req.body);
  if (!parseUserData.success) {
    return res
      .status(400)
      .json({ errors: parseUserData.error.flatten().fieldErrors });
  }

  const { firstName, email, password } = parseUserData.data;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: "User already exists." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUser = await User.create({
      firstName,
      email,
      password: hashedPassword,
    });

    // Generate a JWT token
    const token = generateToken(newUser._id);

    // Send response with user details and token
    res.status(200).json({
      message: "User created successfully",
      user: { firstName, email },
      token: `Bearer ${token}`,
    });
  } catch (e) {
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { SignUp, generateToken };
