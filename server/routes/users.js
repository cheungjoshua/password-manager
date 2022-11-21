const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validateSignUp } = require("../helpers/validation");

// User Sign Up
router.post("/signup", async (req, res) => {
  // Validate user input send error if invalid
  const { error } = validateSignUp(req.body);
  if (error) return res.status(400).send(error);

  // Check if user is exist
  const userExist = await User.findOne({ username: req.body.username });
  // code 200 for existed user. eg. Google, facebook
  // can use code 422 as well
  if (userExist) return res.status(200).send("Email already exists");

  // Hash password with salt if password is valid
  const salt = await bcrypt.genSalt(10);
  hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a specify init vector key for individual user

  const userIv = await crypto.randomBytes(16).toString("hex");
  // const userIv = await Buffer.from(initVector, "hex");

  // Create a new User for save it to database
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    user_IV: userIv,
  });
  try {
    // Save the new created User to DB
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

  // Check if User is exist or not
  const existUser = await User.findOne({ username: req.body.username });
  if (!existUser) return res.status(400).send("User Not Found");

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    existUser.password
  );
  if (!isValidPassword) return res.status(401).send("Invalid password");

  // IF password correct

  // Create JWT token
  const accessToken = jwt.sign(
    { _id: existUser.id },
    process.env.ACCESS_TOKEN,
    { expiresIn: "1h" }
  );
  res.header("access-token", accessToken).send(accessToken);
});

// User Logout
router.post("/logout", () => {
  console.log("user log out");
});

module.exports = router;
