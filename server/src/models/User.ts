import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import crypto from 'crypto';

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

// Hash password and ensure user_IV before saving
UserSchema.pre('save', async function (next) {
  try {
    // `this` is the document being saved
    const doc: any = this;

    if (doc.isModified && doc.isModified('password')) {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      doc.password = await bcrypt.hash(doc.password, salt);
    }

    if (!doc.user_IV) {
      doc.user_IV = crypto.randomBytes(16).toString('hex');
    }

    next();
  } catch (err) {
    next(err as any);
  }
});

const User = mongoose.model("User", UserSchema);

export { User };
