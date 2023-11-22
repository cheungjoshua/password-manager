import { Router } from "express";

import { login, singup } from "../controllers/user";

export default (router: Router) => {
  router.post("/signup", singup);
  router.post("/login/", login);
};
