import { NextFunction } from "express";
import { Model } from "mongoose";
import {
  freddysBbqData,
  restaurantFixtures,
  souvlakiExpress,
  souvlakiExpressData,
} from "../../fixtures.js";
import { RestaurantRequest, RestaurantResponse } from "../types.js";
import RestaurantStructure from "../../types.js";
import RestaurantController from "../RestaurantController.js";
import statusCodes from "../../../globals/statusCodes.js";
import ServerError from "../../../server/ServerError/ServerError.js";

let req: Pick<RestaurantRequest, "body">;

beforeEach(() => {
  req = {
    body: { ...souvlakiExpress },
  } as Pick<RestaurantRequest, "body">;

  jest.clearAllMocks();
});

describe("Given the addRestaurant method of RestaurantController", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Pick<RestaurantResponse, "status" | "json">;

  const next: NextFunction = jest.fn();

  describe("When it receives SouvLaki Express restaurant data", () => {
    const restaurantModel: Pick<
      Model<RestaurantStructure>,
      "find" | "insertOne"
    > = {
      find: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(restaurantFixtures),
      }),
      insertOne: jest.fn().mockResolvedValue(souvlakiExpressData),
    };

    const restaurantController = new RestaurantController(
      restaurantModel as Model<RestaurantStructure>,
    );
    test("Then it should call the response's method status with 201", async () => {
      await restaurantController.addRestaurant(
        req as RestaurantRequest,
        res as RestaurantResponse,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(201);
    });

    test("Then it should call the response's method json with Souvlaki Express completed restaurant", async () => {
      await restaurantController.addRestaurant(
        req as RestaurantRequest,
        res as RestaurantResponse,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          restaurant: expect.objectContaining({
            name: "Souvlaki Express",
          }),
        }),
      );
    });

    describe("When it receives the existent restaurant Freddy's BBQ", () => {
      test("Then it should call the response's method status with a 409 and a 'Restaurant already exists' message", async () => {
        const req = {
          body: freddysBbqData,
        } as Pick<RestaurantRequest, "body">;

        const restaurantModel: Pick<
          Model<RestaurantStructure>,
          "find" | "insertOne"
        > = {
          find: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(restaurantFixtures),
          }),
          insertOne: jest.fn().mockResolvedValue(freddysBbqData),
        };

        const error = new ServerError(
          statusCodes.CONFLICT,
          "Restaurant already exists",
        );

        const restaurantController = new RestaurantController(
          restaurantModel as Model<RestaurantStructure>,
        );

        await restaurantController.addRestaurant(
          req as RestaurantRequest,
          res as RestaurantResponse,
          next as NextFunction,
        );

        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
