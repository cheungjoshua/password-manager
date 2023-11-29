import mongoose from "mongoose";

export type PasswordType = {
  user_id: string;
  collections: [
    {
      _id: mongoose.Types.ObjectId;
      app_name: string;
      app_username: string;
      app_password: string;
    }
  ];
};

export type PasswordCollectionType = {
  _id?: mongoose.Types.ObjectId;
  app_name: string;
  app_username: string;
  app_password: string;
};
