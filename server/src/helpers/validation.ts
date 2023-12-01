import Joi from "joi";
import { PasswordCollectionType } from "../types";

// Validate sign up
const validateSignUp = (data: {
  email: string;
  username: string;
  password: string;
}) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// Validate Login
const validateLogin = (data: { email: string; password: string }) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// Validate Password Post
const validatePost = (data: PasswordCollectionType) => {
  const schema = Joi.object({
    user_id: Joi.string(),
    _id: Joi.string(),
    app_name: Joi.string().min(3).required(),
    app_username: Joi.string().min(6).required().email(),
    app_password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

export { validateSignUp, validateLogin, validatePost };
