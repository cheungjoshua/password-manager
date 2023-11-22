import { Router } from "express";
import verifyToken from "../middleware/verifyToken";

import {
  getPasswords,
  createPassword,
  deletePassword,
  updatePassword,
} from "../controllers/password";

export default (router: Router) => {
  router.get("/api/passwords", verifyToken, getPasswords);
  router.post("/api/passwords", verifyToken, createPassword);
  router.patch("/api/passwords/:id", verifyToken, updatePassword);
  router.delete("/api/passwords/:id", verifyToken, deletePassword);
};
