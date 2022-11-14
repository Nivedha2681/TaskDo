const Task = require("../models/tasks.models");
const User = require("../models/users.models");

// checking the login user
const isHod = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  console.log(user);
  if (user.role === "Head of the department") {
    res.send("Hod Login");
  } else {
    res.send("Professor Login");
  }
};

const saveTask = async (req, res) => {
  const assignedUser = req.body.assignedUser;
  const title = req.body.title;
  const description = req.body.description;
  const assignedDate = req.body.assignedDate;
  const expectedDate = req.body.expectedDate;
  const submittedDate = req.body.submittedDate;

  const newTask = Task({
    assignedUser,
    title,
    description,
    assignedDate,
    expectedDate,
    submittedDate,
  });
  try {
    await newTask.save();
    res.send("task is saved");
  } catch (err) {
    console.log(err, "this has error");
  }
};

const myTask = async (req, res) => {
  const myTasks = await Task.find({ assignedUser: req.user.email });
  res.send(myTasks);
};

const allProf = async (req, res) => {
  const hod = await User.findOne({
    email: req.user.email,
  });
  console.log(hod.department, "hod");
  const allProf = await User.find({
    department: hod.department,
  });
  console.log(allProf);
  res.send(allProf);
};

const submitMyTask = async (req, res) => {
  const id = req.params.id;
  const completeTask = await Task.findByIdAndUpdate(id, { isCompleted: true });
  res.send(completeTask);
};

const rateMyTask = async (req, res) => {
  const id = req.params.id;
  const rate = req.body.rate;
  const rateTask = await Task.findByIdAndUpdate(id, { rating: rate });
  res.send(rateTask);
};

const departmentTask = async (req, res) => {
  const hod = await User.findOne({ email: req.user.email });
  const profTask = await Task.find({ department: hod.department });
  res.send(profTask);
};

const rating = (module.exports = {
  saveTask,
  isHod,
  myTask,
  allProf,
  submitMyTask,
  rateMyTask,
  departmentTask,
});
