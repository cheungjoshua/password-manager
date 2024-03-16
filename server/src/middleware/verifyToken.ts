import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { RequestType } from "types";

export default (req: RequestType, res: Response, next: NextFunction) => {
  const token = req.cookies["access-token"];

  console.log("token", token);

  if (!token) {
    return res.status(401).json({ error: "Access Denied" });
  }

  try {
    const verifiedUser = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = verifiedUser;
    next();
  } catch (err) {
    console.error(err);

  // TODO: clear http token if token invalid for security issue
  
  res.status(400).json({ error: "Invalid Token" });
  }
};
