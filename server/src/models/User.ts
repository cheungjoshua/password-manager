import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  user_IV: {
    type: String,
    require: true,
  },
});

const User = mongoose.model("User", UserSchema);

export { User };
