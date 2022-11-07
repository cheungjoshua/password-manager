const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { validateSignUp } = require("../helpers/validation");

// User Sign Up
router.post("/signup", async (req, res) => {
  // Validate user input send error if invalid
  const { error } = validateSignUp(req.body);
  if (error) return res.status(400).send(error);

  // Check if user is exist
  const userExist = await User.findOne({ username: req.body.username });
  if (userExist) return res.status(400).send("Email already exists");

  // Hash password with salt if password is valid
  const salt = await bcrypt.genSalt(10);
  hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new User for save it to database
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  });
  try {
    // Save the new created User
    const saveSignUpUser = await user.save();
    res.send(saveSignUpUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

// User Login
router.post("/login/", async (req, res) => {
  // Use validateSignUp function check login data
  const { error } = validateSignUp(req.body);
  if (error) return res.status(400).send(error);

  try {
    console.log("user sign up");
  } catch (err) {
    res.status(400).json(err);
  }
});

// User Logout
router.post("/logout", () => {
  console.log("user log out");
});

module.exports = router;
