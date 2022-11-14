const express = require("express");
const LoginRouter = express.Router();
const { login } = require("./login.service");

LoginRouter.post("/", login);
module.exports = LoginRouter;
