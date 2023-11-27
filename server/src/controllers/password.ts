import { Response } from "express";
import mongoose from "mongoose";

import { Password } from "../models/Password";
import { User } from "../models/User";
import { validatePost } from "../helpers/validation";
import { encryptData, decryptList } from "../helpers/cryptoList";
import { RequestType, PasswordCollectionType } from "../types";

export const getPasswords = async (req: RequestType, res: Response) => {
  const userID = req.user._id;
  const { collections } = await Password.findOne({ user_ID: userID });

  // Send msg to front if no passwords list find
  if (!collections) return res.status(200).send("Not passwords list find");

  try {
    const user = await User.findOne({ _id: userID });
    const user_IV = await user.user_IV;

    // TODO: Refactor follow helper function *****
    let decryptedList = decryptList(user_IV, collections);
    res.status(200).json({ decryptedList });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const createPassword = async (req: RequestType, res: Response) => {
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
  const isAppExist = await Password.findOne({
    user_ID: userID,
    app_name: encryptAppName,
  });
  if (isAppExist) return res.status(200).send("App already exists");

  // Passed all checks. Save post to DB

  // Create password post, encrypt data
  const newCollection: PasswordCollectionType = {
    collection_id: new mongoose.Types.ObjectId(),
    app_name: encryptAppName,
    app_username: encryptData(user_IV, app_username),
    app_password: encryptData(user_IV, app_password),
  };

  try {
    const createdPassword = Password.findOneAndUpdate(
      { user_ID: userID },
      {
        $push: {
          collections: newCollection,
        },
      },
      { new: true, upsert: true }
    );

    res.status(200).send(createdPassword);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updatePassword = async (req: RequestType, res: Response) => {
  // Valid check the password Post input
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error);

  // Destruct req.body
  const collectionId = new mongoose.Types.ObjectId(req.params.id);
  const { app_name, app_username, app_password, _id } = req.body;

  // Get initVector from DB
  const userID = req.user._id;
  const { user_IV } = await User.findOne({ _id: userID });

  // Check is the app_name is exist
  const isAppExist = await Password.findOne({
    _id: _id,
    user_ID: userID,
    collection_id: collectionId,
  });
  if (!isAppExist) return res.status(402).send("App Not Find!");

  // Create password post, encrypt data
  const updatedCollection: PasswordCollectionType = {
    collection_id: collectionId,
    app_name: encryptData(user_IV, app_name),
    app_username: encryptData(user_IV, app_username),
    app_password: encryptData(user_IV, app_password),
  };

  try {
    const updatedPassword = await Password.findOneAndUpdate(
      { _id: _id, user_ID: userID, collection_id: req.body.collection_id },
      {
        $set: {
          collections: updatedCollection,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedPassword);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deletePassword = async (req: RequestType, res: Response) => {
  const userID = req.user._id;
  // Destruct req.body
  const { collection_id, _id } = req.body;
  const collectionId = new mongoose.Types.ObjectId(req.params.id);

  // Check password collection is exist
  const isPasswordCollectionExist = await Password.findOne({
    _id: _id,
    collection_id: collectionId,
  });
  if (!isPasswordCollectionExist)
    return res.status(400).send("Collection Not Find!");

  try {
    const updatedPasswordCollection = await Password.findOneAndUpdate(
      { user_ID: userID, _id: _id },
      {
        $pull: {
          collections: {
            collection_id: collection_id,
          },
        },
      },
      { safe: true, multi: false }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};
