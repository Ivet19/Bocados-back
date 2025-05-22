import { Model } from "mongoose";
import { bobsBurgers } from "../../fixtures.js";
import { RestaurantRequest, RestaurantResponse } from "../types.js";
import RestaurantStructure from "../../types.js";
import statusCodes from "../../../globals/statusCodes.js";
import RestaurantController from "../RestaurantController.js";
import { NextFunction } from "express";
import ServerError from "../../../server/ServerError/ServerError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the getRestaurantById method of RestaurantController", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Pick<RestaurantResponse, "status" | "json">;

  const next: NextFunction = jest.fn();

  describe("When it receives a request with Bob Burger's restaurant id that already exists in the dabase", () => {
    const req: Pick<RestaurantRequest, "params"> = {
      params: { restaurantId: bobsBurgers._id },
    };

    const restaurantModel: Pick<Model<RestaurantStructure>, "findById"> = {
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(bobsBurgers),
      }),
    };

    test("Then is should call the received response's method status with 200", async () => {
      const expectedStatus = statusCodes.OK;

      const restaurantController = new RestaurantController(
        restaurantModel as Model<RestaurantStructure>,
      );

      await restaurantController.getRestaurantById(
        req as RestaurantRequest,
        res as RestaurantResponse,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the received response's methos json with Bob Burger's restaurant", async () => {
      const restaurantController = new RestaurantController(
        restaurantModel as Model<RestaurantStructure>,
      );

      await restaurantController.getRestaurantById(
        req as RestaurantRequest,
        res as RestaurantResponse,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ restaurant: bobsBurgers });
    });
  });

  describe("When you receive a request with 163489726094213787261536 Casa Carmen restaurant id that doesn't exist in the database", () => {
    const req: Pick<RestaurantRequest, "params"> = {
      params: { restaurantId: "163489726094213787261536" },
    };

    const restaurantModel: Pick<Model<RestaurantStructure>, "findById"> = {
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };

    test("Then it should call the received next method with 404 'Restaurant not found' error", async () => {
      const error = new ServerError(404, "Restaurant not found");

      const restaurantController = new RestaurantController(
        restaurantModel as Model<RestaurantStructure>,
      );

      await restaurantController.getRestaurantById(
        req as RestaurantRequest,
        res as RestaurantResponse,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
