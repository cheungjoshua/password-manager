const mongoose = require("mongoose");

const PasswordSchema = mongoose.Schema({
  user_ID: {
    type: String,
    require: true,
  },
  app_name: {
    type: String,
    require: true,
  },
  app_username: {
    type: String,
    require: true,
  },
  app_password: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Passwords", PasswordSchema);
