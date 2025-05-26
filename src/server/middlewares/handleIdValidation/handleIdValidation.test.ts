import { Response, NextFunction } from "express";
import statusCodes from "../../../globals/statusCodes.js";
import { ModifiedRestaurantRequest } from "../../../restaurant/controller/types.js";
import handleIdValidation from "./handleIdValidation.js";
import ServerError from "../../ServerError/ServerError.js";

describe("Given the handleValidationId middleware", () => {
  describe("When it receives a request with a '123456789101213161718192' not valid restaurant id", () => {
    const res = {} as Response;

    const next = jest.fn();

    test("Then it should call the received next method with code 400 and 'Not valid id' message", async () => {
      const expectedError = new ServerError(
        statusCodes.BAD_REQUEST,
        "Not valid id",
      );

      const req: Pick<ModifiedRestaurantRequest, "params"> = {
        params: { restaurantId: "12345678910121316171819x" },
      };

      await handleIdValidation(
        req as ModifiedRestaurantRequest,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
