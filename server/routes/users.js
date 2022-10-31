const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// User Sign Up
router.post("/signup", async (req, res) => {
  const body = req.body;
  const salt = await bcrypt.genSalt(10);
  hashedPassword = await bcrypt.hash(body.password, salt);
  const user = new User({
    username: body.username,
    password: hashedPassword,
  });
  try {
    const saveSignUpUser = await user.save();
    console.log("user sign up", body);
    res.send(saveSignUpUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

// User Login
router.post("/login/", () => {
  console.log("user sign up");
});

// User Logout
router.post("/logout", () => {
  console.log("user log out");
});

module.exports = router;
