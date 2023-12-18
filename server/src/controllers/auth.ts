import { Response } from "express";

import { RequestType } from "../types";

export const authentication = (req: RequestType, res: Response) => {
  res.status(200).json({ message: "Token Valid" });
};
