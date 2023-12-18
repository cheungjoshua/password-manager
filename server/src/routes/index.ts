import express, { Router } from "express";

const router = express.Router();

import users from "./users";
import passwords from "./passwords";
import authentication from "./auth";

export default (): Router => {
  authentication(router);
  users(router);
  passwords(router);

  return router;
};
