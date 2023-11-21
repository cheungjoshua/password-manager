export type PasswordType = {
  user_ID: string;
  collections: [
    {
      app_name: string;
      app_username: string;
      app_password: string;
    }
  ];
};
