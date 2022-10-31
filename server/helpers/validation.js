const Joi = require("joi");

// Validate sign up

const validateSignUp = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports = { validateSignUp };
