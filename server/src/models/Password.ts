import mongoose from "mongoose";
import { PasswordType } from "types";

const PasswordSchema = new mongoose.Schema<PasswordType>({
  user_id: {
    type: String,
    require: true,
  },
  collections: [
    {
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

const Password = mongoose.model("Password", PasswordSchema);

export { Password };
