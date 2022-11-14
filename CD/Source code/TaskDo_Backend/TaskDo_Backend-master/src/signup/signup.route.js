const express = require("express");
const signupRouter = express.Router();
const { signup } = require("./signup.service");

signupRouter.post("/", signup);

module.exports = signupRouter;
