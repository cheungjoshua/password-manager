import { Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { RequestType } from "../types";
import { User } from "../models/User";
import { validateSignUp, validateLogin } from "../helpers/validation";

export const login = async (req: RequestType, res: Response) => {
  // Use validateSignUp function check login data
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error);

  // Check if User is exist or not
  const existUser = await User.findOne({ email: req.body.email });
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

  //////// ******* attention *********
  //////// Will Refactor in the future********
  /////// Will use use http cookie

  res.status(200).cookie("access-token", accessToken).send("User log In");

  // res.header("access-token", accessToken).json({ accessToken });
};

export const singup = async (req: RequestType, res: Response) => {
  const { error } = validateSignUp(req.body);
  if (error) return res.status(400).send(error);

  // Check if user is exist
  const userExist = await User.findOne({ username: req.body.username });

  if (userExist) return res.status(200).send("Email already exists");

  // Hash password with salt if password is valid
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a specify init vector key for individual user

  const userIv = crypto.randomBytes(16).toString("hex");

  // Create a new User for save it to database
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
    user_IV: userIv,
  });
  try {
    // Save the new created User to DB
    const saveSignUpUser = await user.save();
    res.send(saveSignUpUser);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const logout = async () => {};

export const deleteUser = async (req: RequestType, res: Response) => {};

// **** For test only, remove when project complete
export const getAllUsers = async (req: RequestType, res: Response) => {
  try {
    const allUsers = await User.find();

    res.status(200).json(allUsers);
  } catch (err) {
    res.status(400).json(err);
  }
};
