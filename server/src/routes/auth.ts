import { Router } from "express";

import verifyToken from "../middleware/verifyToken";
import { authentication } from "../controllers/auth";

export default (router: Router) => {
  router.get("/", verifyToken, authentication);
};
