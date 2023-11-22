import express, { Router } from "express";

const router = express.Router();

import users from "./users";
import passwords from "./passwords";

export default (): Router => {
  users(router);
  passwords(router);

  return router;
};
