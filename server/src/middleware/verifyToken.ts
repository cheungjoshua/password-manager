import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { RequestType } from "types";

export default (req: RequestType, res: Response, next: NextFunction) => {
  const token = req.cookies["access-token"];

  if (!token) return res.status(401).send("Access Denied");

  try {
    const verifiedUser = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = verifiedUser;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
