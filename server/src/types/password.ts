import mongoose from "mongoose";

export type PasswordType = {
  user_ID: string;
  collections: [
    {
      collection_id: mongoose.Types.ObjectId;
      app_name: string;
      app_username: string;
      app_password: string;
    }
  ];
};

export type PasswordCollectionType = {
  collection_id: mongoose.Types.ObjectId;
  app_name: string;
  app_username: string;
  app_password: string;
};
