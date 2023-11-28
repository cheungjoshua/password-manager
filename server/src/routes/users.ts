import { Router } from "express";

import verifyToken from "../middleware/verifyToken";
import { login, singup, getAllUsers, logout } from "../controllers/user";

export default (router: Router) => {
  router.post("/users/signup", singup);
  router.post("/users/login/", login);
  router.post("/user/logout/:id", verifyToken, logout);

  // Remove after testing
  router.get("/users/", getAllUsers);
};
