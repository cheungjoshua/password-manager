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

  // Hash password with salt if password is valid
  const salt = await bcrypt.genSalt(10);
  hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    username: req.body.username,
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
