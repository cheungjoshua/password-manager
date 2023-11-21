import mongoose from "mongoose";
import { PasswordType } from "types/password";

const PasswordSchema = new mongoose.Schema<PasswordType>({
  user_ID: {
    type: String,
    require: true,
  },
  collections: [
    {
      collection_id: {
        type: mongoose.Types.ObjectId,
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
    },
  ],
});

const Passwords = mongoose.model("Passwords", PasswordSchema);

export { Passwords };
