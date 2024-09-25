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
      .status(500)
      .json({ message: "Please enter your information correclty" });
  }

  try {
    const { username, email, password } = parseUserData.data;
    const user = await User.findOne({ email });
    console.log("user : ", user);
    let verfied = await bcrypt.compare(password, user.password);
    console.log("verfied ", verfied);
    if (user && verfied) {
      const token = generateToken(user._id);
      res.cookie("token", token);
      // res.cookie("token", token, {
      //   id: user._id,
      // });
      return res.status(200).json({
        user: {
          username,
          email,
          token: `Bearer ${token}`,
        },
      });
    }
  } catch (e) {
    res.status(401).json({ message: "Invalid email or password" });
  }
};


module.exports = { Login };
