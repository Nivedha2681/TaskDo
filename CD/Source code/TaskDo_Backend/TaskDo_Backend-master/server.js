const express = require("express");
const app = express();
const mongoose = require("mongoose");
const body_parser = require("body-parser");
const cors = require("cors");
app.use(cors());

app.get("/test", (req, res) => {
  res.send("testing");
});

const port = process.env.PORT || 5000;
const SignupRouter = require("./src/signup/signup.route");
const LoginRouter = require("./src/login/login.router");
const { authenticateToken } = require("./src/login/login.service");
const TaskRouter = require("./src/tasks/task.router");

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://Nivedha:Abcdefgh@cluster0.tc4ezzg.mongodb.net/testDB?retryWrites=true&w=majority"
  )
  .then(() => console.log("Db is connected"))
  .catch((err) => console.log(err, "it has an error"));

app.use("/register", SignupRouter);
app.use("/login", LoginRouter);
app.use("/tasks", authenticateToken, TaskRouter);

app.listen(port, () => [
  console.log(`server starts at http://localhost:${port}`),
]);
