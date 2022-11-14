const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  assignedUser: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    requried: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignedDate: {
    type: Date,
    default: Date.now,
  },
  expectedDate: {
    type: Date,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

module.exports = Task = mongoose.model("task", TaskSchema);
