const Joi = require("joi");

// Validate sign up
const validateSignUp = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// Validate Login
const validateLogin = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// Validate Password Post
const validatePost = (data: any) => {
  const schema = Joi.object({
    app_name: Joi.string().min(3).required(),
    app_username: Joi.string().min(6).required().email(),
    app_password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

export { validateSignUp, validateLogin, validatePost };
