const express = require("express");
const TaskRouter = express.Router();
const {upload} = require('../../server.js')
const {
  saveTask,
  isHod,
  myTask,
  allProf,
  submitMyTask,
  departmentTask,
  rateMyTask,
} = require("./task.service");

TaskRouter.post("/saveTask", saveTask);
TaskRouter.get("/isHod", isHod);
TaskRouter.get("/myTask", myTask);
TaskRouter.get("/allProf", allProf);    
TaskRouter.post("/submitTask/:id", submitMyTask);
TaskRouter.get("/departmentTask", departmentTask);
TaskRouter.put("/rateMyTask/:id", rateMyTask);

module.exports = TaskRouter;
