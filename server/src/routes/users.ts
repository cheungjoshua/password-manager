import { Router } from "express";

import { login, singup, getAllUsers } from "../controllers/user";

export default (router: Router) => {
  router.post("/users/signup", singup);
  router.post("/users/login/", login);

  // Remove after testing
  router.get("/users/", getAllUsers);
};
