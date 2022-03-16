// Task Schema is defined here
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskname: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: [true, "Type is required"],
    trim: true,
  },
  createdat: {
    type: Date,
    default: Date.now(),
  },
  updatedat: {
    type: Date,
    default: Date.now(),
  },
});

const task = mongoose.model("task", taskSchema);
module.exports = task;
