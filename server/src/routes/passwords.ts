import express from "express";
const router = express.Router();
import { Password } from "../models/Password";
import { User } from "../models/User";
import { validatePost } from "../helpers/validation";
import { encryptData, decryptList } from "../helpers/cryptoList";
import { createUpdateObj } from "../helpers/createUpdateObject";
import { RequestType } from "types/api";
import { PasswordType } from "types/password";

// middle ware - verify json web token
const verify = require("../middleware/verifyToken");

// Get all the passwords post from Logged In User
router.get("/", verify, async (req: RequestType, res) => {
  const userID = req.user._id;
  const passwordsCollection = await Password.findOne({ user_ID: userID });

  // Send msg to front if no passwords list find
  if (!passwordsCollection)
    return res.status(200).send("Not passwords list find");

  try {
    const user = await User.findOne({ _id: userID });
    const user_IV = await user.user_IV;

    // TODO: Refactor follow helper function *****
    let decryptedList = decryptList(user_IV, passwordsCollection);
    res.status(200).json({ decryptedList });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// TODO: Refactor following code to new schema *****

// Create New password post and save to DB
router.post("/", verify, async (req: RequestType, res) => {
  // Valid check the password Post input
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error);

  // Destruct req.body
  const { app_name, app_username, app_password } = req.body;

  // Get initVector from DB
  const userID = req.user._id;
  const { user_IV } = await User.findOne({ _id: userID });

  // Check is the app_name is exist
  const encryptAppName = encryptData(user_IV, app_name);
  const appExisted = await Password.findOne({ app_name: encryptAppName });
  if (appExisted) return res.status(200).send("App already exists");

  // Passed all checks. Save post to DB

  // Create password post, encrypt data
  const passwordPost = new Password({
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

// Edit && Update existed password from DB
router.patch("/:id", verify, async (req: RequestType, res) => {
  // ** REFACTOR***
  // either using req.params.id/ req.body.id
  // use it as collection_id *****

  // Check Password post is exist
  const postExist = await Password.findOne({ _id: req.params.id });
  if (!postExist) return res.status(400);

  // Password exist, do follow
  // Get user from DB for userIV
  const user = await User.findOne({ _id: req.user._id });

  // Check logged in User same as password post creator
  if (postExist.user_ID !== req.user._id)
    return res.status(400).send("User Request Denied");

  // Encrypt update data
  const encryptedUpdateObj = createUpdateObj(user.user_IV, req.body);

  try {
    //*** TODO: REFACTOR
    // get get user id, and find collection with userID,
    // find collection with collection_id
    // update/replace encrypt data along collection_id with "update query"  */

    // EX:
    // model.updateOne(
    //     { _id: 1, "items.id": "2" },
    //     {
    //         $set: {
    //             "items.$.name": "yourValue",
    //             "items.$.value": "yourvalue",
    //          }
    //     }
    // )

    //TODO: change query using "findandupdate"
    const updatedPost = await Password.updateOne(
      { _id: req.params.id },
      { $set: encryptedUpdateObj }
    );

    // Get the updated password post for respond to client
    const updatedPassword = await Password.findOne({ _id: req.params.id });

    res.status(200).json({ updatedPassword });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// Delete existed password post from DB
router.delete("/:id", verify, async (req: RequestType, res) => {
  // Check request delete password post exist
  const existedPost = await Password.findOne({ _id: req.params.id });
  if (!existedPost) return res.status(400).send("No Post Find");

  // Check logged in User same as Password post creator
  if (existedPost.user_ID !== req.user._id)
    return res.status(400).send("User Request Denied");

  // Passed all check, do follow
  try {
    const deletedPassword = await Password.remove({ _id: req.params.id });
    res.status(200).send("removed Password");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
