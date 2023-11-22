import express, { Router } from "express";

const router = express.Router();

import users from "./users";

export default (): Router => {
  users(router);

  return router;
};
