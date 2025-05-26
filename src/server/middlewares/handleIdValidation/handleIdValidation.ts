import { isValidObjectId } from "mongoose";
import ServerError from "../../ServerError/ServerError.js";
import statusCodes from "../../../globals/statusCodes.js";
import { NextFunction, Response } from "express";
import { IdRequest } from "../../../restaurant/controller/types.js";

const handleIdValidation = (
  req: IdRequest,
  _res: Response,
  next: NextFunction,
): void => {
  const { restaurantId } = req.params;

  const isValidId = isValidObjectId(restaurantId);

  if (!isValidId) {
    const error = new ServerError(statusCodes.BAD_REQUEST, "Not valid id");

    next(error);

    return;
  }

  next();
};

export default handleIdValidation;
