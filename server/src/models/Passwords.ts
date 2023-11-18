import mongoose from "mongoose";

const PasswordSchema = new mongoose.Schema({
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

const Passwords = mongoose.model("Passwords", PasswordSchema);

export { Passwords };
