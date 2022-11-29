const Joi = require("joi");

// Validate sign up
// The same Validation function for log in check
const validateSignUp = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const validatePost = (data) => {
  const schema = Joi.object({
    app_name: Joi.string().min(3).required(),
    app_username: Joi.string().min(6).required().email(),
    app_password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

module.exports = { validateSignUp, validatePost };
