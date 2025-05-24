import { Model } from "mongoose";
import { NextFunction } from "express";
import statusCodes from "../../../globals/statusCodes.js";
import {
  krustyBurger,
  krustyBurgerData,
  theLotusLantern,
  theLotusLanternData,
  updatedLotusLantern,
} from "../../fixtures.js";
import { RestaurantRequest, RestaurantResponse } from "../types.js";
import RestaurantStructure from "../../types.js";
import RestaurantController from "../RestaurantController.js";
import ServerError from "../../../server/ServerError/ServerError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the updateRestaurant method of restaurantController", () => {
  const res: Pick<RestaurantResponse, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with The Lotus Lantern restaurant id and its updated data", () => {
    test("Then it should call the response's status method with 200 and The Lotus Lantern updated restaurant", async () => {
      const expectedStatusCode = statusCodes.OK;

      const req: Pick<RestaurantRequest, "params" | "body"> = {
        params: { restaurantId: theLotusLantern._id },
        body: theLotusLanternData,
      };
      const restaurantModel: Pick<
        Model<RestaurantStructure>,
        "findById" | "findOneAndReplace"
      > = {
        findById: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(theLotusLanternData),
        }),
        findOneAndReplace: jest.fn().mockResolvedValue(updatedLotusLantern),
      };
      const restaurantController = new RestaurantController(
        restaurantModel as Model<RestaurantStructure>,
      );

      await restaurantController.updateRestaurant(
        req as RestaurantRequest,
        res as RestaurantResponse,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({
        restaurant: updatedLotusLantern,
      });
    });
  });

  describe("When it receives a request with Krusty Burger data restaurant and id that does not exist in data base", () => {
    test("Then it should call the the received next method with 404 'This restaurant doesn't exist' error", async () => {
      const expectedStatusCode = new ServerError(
        statusCodes.NOT_FOUND,
        "This restaurant doesn't exist",
      );

      const req: Pick<RestaurantRequest, "params" | "body"> = {
        params: { restaurantId: krustyBurger._id },
        body: krustyBurgerData,
      };
      const restaurantModel: Pick<
        Model<RestaurantStructure>,
        "findById" | "findOneAndReplace"
      > = {
        findById: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
        findOneAndReplace: jest.fn().mockResolvedValue(null),
      };
      const restaurantController = new RestaurantController(
        restaurantModel as Model<RestaurantStructure>,
      );

      await restaurantController.updateRestaurant(
        req as RestaurantRequest,
        res as RestaurantResponse,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});
