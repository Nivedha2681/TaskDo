const jwt = require("jsonwebtoken");
const User = require("../models/users.models");
const bcrypt = require("bcrypt");

const generateToken = (email, password) => {
  return jwt.sign(
    { email, password },
    "LKD394dsjflkasjdfNqnadlfAALKJDFCMAIERULAKDFLAIJFANDFAKNFEALJA",
    {
      expiresIn: "604800s",
    }
  );
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) res.send("authentication failed", 404);
  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    "LKD394dsjflkasjdfNqnadlfAALKJDFCMAIERULAKDFLAIJFANDFAKNFEALJA",
    (err, user) => {
      if (err) res.send("Invalid user", 404);
      else {
        req.user = user;
        next();
      }
    }
  );
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email });
  if (!user) res.send("No user found with this email", 404);
  else if (!(await bcrypt.compare(password, user.password))) {
    res.send("Password does not match with the email", 404);
  } else {
    const accessToken = generateToken(email, password);
    res.json({ AccessToken: accessToken });
  }
};

module.exports = { login, authenticateToken };
