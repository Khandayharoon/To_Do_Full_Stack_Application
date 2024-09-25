const { Todo,} = require("../config/db");
const mongoose = require('mongoose');
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

    console.log("User ID:", userId);

    const newTodo = await Todo.create({ title, description, user : userId });
    res.status(201).json({
      message: "Todo has been created",
      todo: newTodo,
    });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ message: "Server error." });
  }
};

const gettodos = async (req, res) => {
  try {
    const userid = req.user._id;
    console.log("User ID:", userid); 
    const todos = await Todo.find({ user: new mongoose.Types(userid) });
    console.log(todos);

    if (todos.length === 0) {
      return res.status(200).json({ message: "No todos available." });
    }

    res.status(200).json({ todos });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ message: "Server error while fetching todos." });
  }
}

module.exports = { createTodo, gettodos };
