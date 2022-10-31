const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
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

module.exports = mongoose.model("User", UserSchema);
