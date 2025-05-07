import { Request, Response } from "express";
import statusCodes from "../../../globals/statusCodes.js";

const handleHealthCheckStatus = (_req: Request, res: Response): void => {
  res.status(statusCodes.OK).json({ message: "pong 🏓" });
};

export default handleHealthCheckStatus;
