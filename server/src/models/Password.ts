import mongoose, { Document } from "mongoose";

export interface IPassword extends Document {
  user_id: string;
  collections: Array<{
    app_name: string;
    app_username: string;
    app_password: string;
    _id: mongoose.Types.ObjectId;
  }>;
}

const PasswordSchema = new mongoose.Schema<IPassword>({
  user_id: {
    type: String,
    required: true,
  },
  collections: [{
    app_name: {
      type: String,
      required: true,
    },
    app_username: {
      type: String,
      required: true,
    },
    app_password: {
      type: String,
      required: true,
    },
  }],
});

const Password = mongoose.model<IPassword>("Password", PasswordSchema);

export { Password };
export default Password;
