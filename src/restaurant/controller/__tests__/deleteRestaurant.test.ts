import { NextFunction } from "express";
import { Model } from "mongoose";
import ServerError from "../../../server/ServerError/ServerError.js";
import { losPollosHermanos } from "../../fixtures.js";
import RestaurantStructure from "../../types.js";
import { RestaurantRequest, RestaurantResponse } from "../types.js";
import RestaurantController from "../RestaurantController.js";
import statusCodes from "../../../globals/statusCodes.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the deleteRestaurant method of RestaurantController", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Pick<RestaurantResponse, "status" | "json">;

  const next = jest.fn();

  describe("When it receives a request with Los Pollos Hermanos restaurant id that is already in the database", () => {
    const req = {
      params: { restaurantId: losPollosHermanos._id },
    } as Pick<RestaurantRequest, "params">;

    const restaurantModel: Pick<
      Model<RestaurantStructure>,
      "findOneAndDelete"
    > = {
      findOneAndDelete: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(losPollosHermanos),
      }),
    };

    test("Then it should call the received response's method status with 200", async () => {
      const restaurantController = new RestaurantController(
        restaurantModel as Model<RestaurantStructure>,
      );

      await restaurantController.deleteRestaurant(
        req as RestaurantRequest,
        res as RestaurantResponse,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(statusCodes.OK);
    });

    test("Then it should call the received response's method json with Los Pollos Hermanos restaurant", async () => {
      const restaurantController = new RestaurantController(
        restaurantModel as Model<RestaurantStructure>,
      );

      await restaurantController.deleteRestaurant(
        req as RestaurantRequest,
        res as RestaurantResponse,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ restaurant: losPollosHermanos });
    });
  });

  describe("When it receives a request with Chiringuito de Pepe restaurant id that is not in the database", () => {
    const req = {
      params: { restaurantId: "123456789123456789012345" },
    } as Pick<RestaurantRequest, "params">;

    const restaurantModel: Pick<
      Model<RestaurantStructure>,
      "findOneAndDelete"
    > = {
      findOneAndDelete: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };

    test("Then it should call the received next method with 404 'Restaurant not found' error", async () => {
      const error = new ServerError(
        statusCodes.NOT_FOUND,
        "Restaurant not found",
      );
      const restaurantController = new RestaurantController(
        restaurantModel as Model<RestaurantStructure>,
      );

      await restaurantController.deleteRestaurant(
        req as RestaurantRequest,
        res as RestaurantResponse,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
