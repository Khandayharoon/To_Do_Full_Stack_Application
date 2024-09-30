const express = require("express");
const { connectDB } = require("./config/db");
const signUpRoute = require("./routes/signUpRoute");
const LoginRoute = require("./routes/LoginRoute");
const TodoRoutes = require("./routes/TodoRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/v1/signup", signUpRoute);
app.use("/api/v1/login", LoginRoute);
app.use("/api/v1/createtodo", TodoRoutes);
app.use("/api/v1/gettodo", TodoRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/api/v1/`);
});
