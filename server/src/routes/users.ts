import { Router } from "express";

import { login, singup } from "../controllers/user";

export default (router: Router) => {
  router.post("/users/signup", singup);
  router.post("/users/login/", login);
};
