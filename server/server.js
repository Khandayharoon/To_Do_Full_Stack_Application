const express = require("express");
const { connectDB } = require("./config/db");
const signUpRoute = require("./routes/signUpRoute");
const LoginRoute = require("./routes/LoginRoute");
const TodoRoutes = require("./routes/TodoRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// CORS Options
const corsOptions = {
  origin: "http://localhost:5173", // Your React app's URL
  credentials: true, // Allow credentials (cookies) to be sent
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
// Use the configured CORS options
app.use(cookieParser());
// Connect to the database
connectDB();

// Set up routes
app.use("/api/v1/signup", signUpRoute);
app.use("/api/v1/login", LoginRoute);
app.use("/api/v1/", TodoRoutes);
// app.use("/api/v1/gettodo", TodoRoutes);
// app.use("/api/v1/deletetodo", TodoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/api/v1/`);
});
