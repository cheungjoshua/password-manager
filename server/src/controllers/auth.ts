import { Response } from "express";

import { RequestType } from "../types";

export const authentication = async (req: RequestType, res: Response) => {
  const cookie = req.cookies("access-token");
  console.log("cookie", cookie);
  res.status(200).json({ message: "Token Valid" });
};
