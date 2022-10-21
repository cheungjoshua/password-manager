const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// User Sign Up
router.post("/signup", () => {
  console.log("user sign up");
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
