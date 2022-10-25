const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// User Sign Up
router.post("/signup", async (req, res) => {
  const body = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    console.log("user sign up", body);
    res.send(body);
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
