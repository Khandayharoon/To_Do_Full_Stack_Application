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

  // console.log("Todo ID to delete:", id);

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

const searchtodo = async (req, res) => {
  try {
    const { keyword, date, startDate, endDate } = req.query;
    let query = { user: req.user._id }; // Filter by current user

    // Search by keyword in title or description
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    // Date filtering logic
    if (date) {
      query.createdAt = {
        $gte: new Date(date),
        $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
      };
    } else if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const todos = await Todo.find(query);
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { createTodo, gettodos, deletetodo, searchtodo };
