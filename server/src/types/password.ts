export interface PasswordType {
  user_ID: String;
  collections: [
    {
      app_name: String;
      app_username: String;
      app_password: String;
    }
  ];
}
