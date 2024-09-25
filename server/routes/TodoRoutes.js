const express = require("express");
const router = express.Router();

const { createTodo , gettodos } = require("../controllers/TodoController");
const { authenticated } = require("../middlewares/Authentication"); 


router.post("/", authenticated, createTodo);

router.get("/", authenticated, gettodos);

module.exports = router;
