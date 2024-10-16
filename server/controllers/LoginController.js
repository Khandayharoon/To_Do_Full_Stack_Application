const { generateToken } = require("../controllers/SignupController");
const { User } = require("../config/db");
const bcrypt = require("bcrypt");
const zod = require("zod");

// User validation schema
const userZodSchema = zod.object({
  // firstName: zod.string(),
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

const Login = async (req, res) => {
  const parseUserData = userZodSchema.safeParse(req.body);
  if (!parseUserData.success) {
    return res
      .status(400)
      .json({ message: "Please enter your information correctly." });
  }

  try {
    const { email, password } = parseUserData.data;
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Compare password with hashed password in the database
    const verified = await bcrypt.compare(password, user.password);
    if (verified) {
      const token = generateToken(user._id);

      // Set cookie for token
      res.cookie("token", token, {
        httpOnly: true, // Makes the cookie accessible only by the server
        secure: process.env.NODE_ENV === "production", // Enable secure flag only in production (HTTPS)
        sameSite: "None", // Allows cross-origin requests
        path: "/",
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // Cookie expires in 15 days
      });

      // Also set the token in the Authorization header for immediate use
      req.headers["authorization"] = token;

      return res.status(200).json({
        user: {
          firstName: user.firstName, // Assuming username is part of the user object
          email: user.email,
          token: token,
        },
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (e) {
    // console.error("Login error:", e);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { Login };
