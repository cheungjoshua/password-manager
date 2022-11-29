const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Passwords = require("../models/Passwords");
const Users = require("../models/User");
const { validatePost } = require("../helpers/validation");
const { encryptData, decryptList } = require("../helpers/cryptoList");

// middle ware - verify json web token
const verify = require("../middleware/verifyToken");

// Get all the passwords post
router.get("/", verify, async (req, res) => {
  const userID = req.user._id;
  const passwordsList = await Passwords.find({ user_ID: userID });

  // Send msg to front if no passwords list find
  if (passwordsList.length === 0)
    return res.status(200).send("Not passwords list find");

  try {
    const user = await Users.findOne({ _id: userID });
    const user_IV = user.user_IV;
    const decryptedList = decryptList(user_IV, passwordsList);
    res.status(200).json({ decryptedList });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create New password post and save to DB
router.post("/", verify, async (req, res) => {
  // Valid check the password Post input
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error);

  // Check is the app_name is exist
  const appExisted = await Passwords.findOne({ app_name: req.body.app_name });
  if (appExisted) return res.status(200).send("App already exists");

  // Passed all checks. Save post to DB
  const userID = req.user.id;

  // Get initVector from DB
  const { user_IV } = await Users.findOne({ _id: userID });

  // Create password post, encrypt data
  const { app_name, app_username, app_password } = req.body;
  const passwordPost = new Passwords({
    user_ID: userID,
    app_name: encryptData(user_IV, app_name),
    app_username: encryptData(user_IV, app_username),
    app_password: encryptData(user_IV, app_password),
  });

  try {
    const posted = await passwordPost.save();
    res.status(200).send(posted);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Edit/Update existed password from DB

// Delete existed password post from DB

module.exports = router;
