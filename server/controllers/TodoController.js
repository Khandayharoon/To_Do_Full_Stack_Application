const { Todo } = require("../config/db");
const mongoose = require("mongoose");
const zod = require("zod");

const todoZodSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
});

const createTodo = async (req, res) => {
  const parseTodoData = todoZodSchema.safeParse(req.body);

  if (!parseTodoData.success) {
    return res.status(400).json({ message: "Invalid Inputs" });
  }

  try {
    const { title, description } = parseTodoData.data;

    const userId = req.user._id;

    // console.log("User ID:", userId);

    const newTodo = await Todo.create({ title, description, user: userId });
    res.status(200).json({
      message: "Todo has been created",
      todo: newTodo,
    });
  } catch (e) {
    // console.error("Error:", e);
    res.status(500).json({ message: "Server error." });
  }
};

const gettodos = async (req, res) => {
  try {
    const userid = req.user._id; // Assuming req.user._id is the ObjectId
    // console.log("User ID:", userid);

    // Cast userid to a valid ObjectId
    const todos = await Todo.find({
      user: new mongoose.Types.ObjectId(userid),
    });

    // console.log(todos);

    if (todos.length === 0) {
      return res.status(200).json({ message: "No todos available." });
    }

    res.status(200).json(todos);
  } catch (e) {
    // console.error("Error:", e);
    res.status(500).json({ message: "Server error while fetching todos." });
  }
};

const deletetodo = async (req, res) => {
  const id = req.query.id;

  console.log("Todo ID to delete:", id);

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res
      .status(200)
      .json({ message: "Todo deleted successfully", todo: deletedTodo });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the todo" });
  }
};

module.exports = { createTodo, gettodos, deletetodo };
