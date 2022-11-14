const email_validator = require("email-validator");
const bcrypt = require("bcrypt");
const User = require("../models/users.models");

const signup = async (req, res) => {
  const fullname = req.body.fullname;
  const email = req.body.email;
  const department = req.body.department;
  const role = req.body.role;
  const password = req.body.password;

  const newUser = User({
    fullname,
    email: email_validator.validate(email)
      ? email
      : res.send("Invalid Email", 404),
    department,
    role,
    password: await bcrypt.hash(password, 10),
  });

  try {
    if (newUser.role === "Head of the department") {
      User.findOne({ role, department }, function (err, user) {
        if (err) res.send("something went wrong", 404);
        if (user) {
          res.send(
            `HOD position for ${department} has already been occupied`,
            404
          );
        } else {
          newUser
            .save()
            .then((user) => res.send("new hod has been appointed"))
            .catch((err) => {
              if (err.toString().includes("email")) {
                res.send("Email is taken", 404);
              }
            });
        }
      });
    } else {
      await newUser.save();
      res.send("user has been saved successfully");
    }
  } catch (err) {
    if (err.toString().includes("email")) {
      res.send("Email is taken", 404);
    }
  }
};

module.exports = { signup };
