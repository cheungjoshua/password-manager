const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Passwords = require("../models/Passwords");
const Users = require("../models/User");
const { encryptData, decryptList } = require("../helpers/cryptoList");

// middle ware - verify json web token
const verify = require("../middleware/verifyToken");

// Get all the passwords post
router.get("/", verify, async (req, res) => {
  const userID = req.user._id;
  const passwordsList = await Passwords.find({ _id: userID });

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

// Edit/Update existed password from DB

// Delete existed password post from DB

module.exports = router;
