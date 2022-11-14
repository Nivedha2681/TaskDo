const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    requied: true,
  },
  department:{
    type: String,
    required: true,
  },
  role:{
    type: String,
    required: true,
  },
  password: {
    type: String,
    requied: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports =  User = mongoose.model("User", UsersSchema);

