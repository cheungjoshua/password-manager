const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// User Sign Up
router.post("/signup", async (req, res) => {
  try {
    console.log("user sign up", req.body);
    res.send(req.body);
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
