const { generateToken } = require("../controllers/SignupController");
const { User } = require("../config/db");
const bcrypt = require("bcrypt");
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

const Login = async (req, res) => {
  const parseUserData = userZodSchema.safeParse(req.body);
  if (!parseUserData.success) {
    return res
      .status(400)
      .json({ message: "Please enter your information correctly." });
  }

  try {
    const { email, password } = parseUserData.data; // Removed username as it may not be necessary for login
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
          username: user.username, // Assuming username is part of the user object
          email: user.email,
          token: token,
        },
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (e) {
    console.error("Login error:", e);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { Login };

// const { generateToken } = require("../controllers/SignupController");
// const { User } = require("../config/db");
// const bcrypt = require("bcrypt");
// const zod = require("zod");

// // User validation schema
// const userZodSchema = zod.object({
//   username: zod.string(),
//   email: zod.string().email(),
//   password: zod
//     .string()
//     .min(8, { message: "Password must be at least 8 characters long." })
//     .refine((val) => /[A-Z]/.test(val), {
//       message: "Password must contain at least one uppercase letter.",
//     })
//     .refine((val) => /[0-9]/.test(val), {
//       message: "Password must contain at least one number.",
//     })
//     .refine((val) => /[a-z]/.test(val), {
//       message: "Password must contain at least one lowercase letter.",
//     })
//     .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
//       message: "Password must contain at least one special character.",
//     }),
// });

// const Login = async (req, res) => {
//   const parseUserData = userZodSchema.safeParse(req.body);
//   if (!parseUserData.success) {
//     return res
//       .status(500)
//       .json({ message: "Please enter your information correclty" });
//   }

//   try {
//     const { username, email, password } = parseUserData.data;
//     const user = await User.findOne({ email });
//     console.log("user : ", user);
//     let verfied = await bcrypt.compare(password, user.password);
//     console.log("verfied ", verfied);
//     if (user && verfied) {
//       const token = generateToken(user._id);
//       // res.cookie("token", token);
//       req.headers["authorization"] = token;
//       res.cookie("token", token, {
//         httpOnly: true, // Makes the cookie accessible only by the server, not via JS
//         secure: process.env.NODE_ENV === "production", // Enables secure flag only in production (HTTPS)
//         sameSite: "None", // Allows cross-origin requests (important for cookies from different domains/ports)
//         path: "/",
//         expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
//       });
//       return res.status(200).json({
//         user: {
//           username,
//           email,
//           token: `Bearer ${token}`,
//         },
//       });
//     }
//   } catch (e) {
//     res.status(401).json({ message: "Invalid email or password" });
//   }
// };

// module.exports = { Login };
