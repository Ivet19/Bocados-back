import { Model } from "mongoose";
import { NextFunction, Response } from "express";
import {
  bobsBurgers,
  losPollosHermanos,
  notVisitedLosPollosHermanos,
  visitedBobsBurgers,
} from "../../fixtures.js";
import RestaurantStructure from "../../types.js";
import { RestaurantRequest, RestaurantResponse } from "../types.js";
import RestaurantController from "../RestaurantController.js";
import ServerError from "../../../server/ServerError/ServerError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the toggleRestaurantById method of RestaurantController", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives not visited Bob's Burger restaurant id", () => {
    const req: Pick<RestaurantRequest, "params"> = {
      params: { restaurantId: bobsBurgers._id },
    };

    const restaurantModel: Pick<
      Model<RestaurantStructure>,
      "findById" | "findByIdAndUpdate"
    > = {
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(bobsBurgers),
      }),
      findByIdAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(visitedBobsBurgers),
      }),
    };

    test("Then it should call the received response's status method with 200", async () => {
      const expectedStatus = 200;

      const restaurantController = new RestaurantController(
        restaurantModel as Model<RestaurantStructure>,
      );

      await restaurantController.toggleRestaurantById(
        req as RestaurantRequest,
        res as RestaurantResponse,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should return Bob's Burger as visited", async () => {
      const restaurantController = new RestaurantController(
        restaurantModel as Model<RestaurantStructure>,
      );

      await restaurantController.toggleRestaurantById(
        req as RestaurantRequest,
        res as RestaurantResponse,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ restaurant: visitedBobsBurgers });
    });
  });

  describe("When it receives the visited Los Pollos Hermanos restaurant id", () => {
    const req: Pick<RestaurantRequest, "params"> = {
      params: { restaurantId: losPollosHermanos._id },
    };

    const restaurantModel: Pick<
      Model<RestaurantStructure>,
      "findById" | "findByIdAndUpdate"
    > = {
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(losPollosHermanos),
      }),
      findByIdAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(notVisitedLosPollosHermanos),
      }),
    };

    test("Then it should return Los Pollos Hermanos as not visited'", async () => {
      const restaurantController = new RestaurantController(
        restaurantModel as Model<RestaurantStructure>,
      );
      await restaurantController.toggleRestaurantById(
        req as RestaurantRequest,
        res as RestaurantResponse,
        next as NextFunction,
      );
      expect(res.json).toHaveBeenCalledWith({
        restaurant: notVisitedLosPollosHermanos,
      });
    });
  });

  describe("When it receives 66436f7b9c0e9b2a1f7d88c3 id that doesn't exist", () => {
    const req: Pick<RestaurantRequest, "params"> = {
      params: { restaurantId: "66436f7b9c0e9b2a1f7d88c3" },
    };

    const restaurantModel: Pick<Model<RestaurantStructure>, "findById"> = {
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };

    test("Then it should call the received next method with code 404 and 'This restaurant doesn't exist' message", async () => {
      const error = new ServerError(404, "This restaurant doesn't exist");

      const restaurantController = new RestaurantController(
        restaurantModel as Model<RestaurantStructure>,
      );
      await restaurantController.toggleRestaurantById(
        req as RestaurantRequest,
        res as RestaurantResponse,
        next as NextFunction,
      );
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
