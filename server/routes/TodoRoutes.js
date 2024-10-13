const express = require("express");
const router = express.Router();

const {
  createTodo,
  gettodos,
  deletetodo,
  searchtodo,
} = require("../controllers/TodoController");
const { authenticated } = require("../middlewares/Authentication");
router.post("/createTodo", authenticated, createTodo);

router.get("/gettodo", authenticated, gettodos);

router.delete("/deletetodo", authenticated, deletetodo);

router.get("/SearchTodo", authenticated, searchtodo);

module.exports = router;
