const express = require("express");
const router = express.Router();
const { SignUp } = require("../controllers/SignupController");

router.post("/", SignUp); 

module.exports = router;
