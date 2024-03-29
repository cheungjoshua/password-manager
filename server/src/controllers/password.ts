import { Response } from "express";
import mongoose from "mongoose";

import { Password } from "../models/Password";
import { User } from "../models/User";
import { validatePost } from "../helpers/validation";
import { encryptData, decryptList } from "../helpers/cryptoList";
import { RequestType, PasswordCollectionType } from "../types";

export const getPasswords = async (req: RequestType, res: Response) => {
  const userID = req.user._id;
  const passwordsCollection = await Password.findOne({ user_id: userID });

  // Send msg to front if no passwords list find
  if (!passwordsCollection)
    return res.status(200).send("Not passwords list find");

  try {
    const user = await User.findOne({ _id: userID });
    const user_IV = await user.user_IV;

    let passwordsList = decryptList(user_IV, passwordsCollection.collections);

    res.status(200).json({ passwordsList });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const createPassword = async (req: RequestType, res: Response) => {
  // Valid check the password Post input
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error);

  const userID = req.user._id;

  // Destruct req.body
  const { app_name, app_username, app_password } = req.body;

  // Get initVector from DB
  const { user_IV } = await User.findOne({ _id: userID });

  // Check is the app_name is exist
  const encryptAppName = encryptData(user_IV, app_name);
  const isAppExist = await Password.findOne({
    "collections.app_name": encryptAppName,
    user_id: userID,
  });
  if (isAppExist) return res.status(403).send("App Already Exist");

  // Passed all checks. Save post to DB

  // Create password post, encrypt data
  const newCollection: PasswordCollectionType = {
    app_name: encryptAppName,
    app_username: encryptData(user_IV, app_username),
    app_password: encryptData(user_IV, app_password),
  };

  try {
    const createdPassword = await Password.findOneAndUpdate(
      { user_id: userID },
      {
        $push: {
          collections: newCollection,
        },
      },
      { new: true, upsert: true }
    );

    res.status(200).json(createdPassword);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const updatePassword = async (req: RequestType, res: Response) => {
  // Valid check the password Post input
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error);

  // Destruct req.body
  const { app_name, app_username, app_password, _id } = req.body;
  const collectionId = _id;

  // Get initVector from DB
  const userID = req.user._id;
  const { user_IV } = await User.findOne({ _id: userID });

  // Check is the app_name is exist
  const isAppExist = await Password.findOne({
    user_id: userID,
    "collections._id": collectionId,
  });
  if (!isAppExist) return res.status(402).send("App Not Find!");

  try {
    const updatedPassword = await Password.updateOne(
      { user_id: userID, "collections._id": collectionId },
      {
        $set: {
          "collections.$.app_name": encryptData(user_IV, app_name),
          "collections.$.app_username": encryptData(user_IV, app_username),
          "collections.$.app_password": encryptData(user_IV, app_password),
        },
      }
    );

    res.status(200).json(updatedPassword);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const deletePassword = async (req: RequestType, res: Response) => {
  const userID = req.user._id;
  // Destruct req.body

  const collectionId = new mongoose.Types.ObjectId(req.params.id);

  // Check password collection is exist
  const isPasswordCollectionExist = await Password.findOne({
    "collections._id": collectionId,
    user_id: userID,
  });
  if (!isPasswordCollectionExist)
    return res.status(400).send("Collection Not Find!");

  try {
    const updatedPasswordCollection = await Password.updateOne(
      { user_id: userID },
      {
        $pull: {
          collections: {
            _id: collectionId,
          },
        },
      },
      { safe: true, strict: false }
    );
    res.status(200).json(updatedPasswordCollection);
  } catch (err) {
    res.status(400).json(err);
  }
};
