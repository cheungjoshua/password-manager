import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    user_IV: {
      type: String,
      required: [true, "User IV is required"],
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre("save", async function (next) {
  try {
    const user = this as mongoose.Document & {
      password: string;
      user_IV?: string;
      isModified: (field: string) => boolean;
    };

    if (user.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    if (!user.user_IV) {
      user.user_IV = crypto.randomBytes(16).toString("hex");
    }

    next();
  } catch (err) {
    next(err as any);
  }
});

const User = mongoose.model("User", UserSchema);

export { User };
