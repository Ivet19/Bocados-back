import { Model } from "mongoose";
import { Request, Response } from "express";
import { restaurantFixtures } from "../../fixtures.js";
import RestaurantStructure from "../../types.js";
import { RestaurantController } from "../RestaurantController.js";
import { RestaurantRequest } from "../types.js";

let originalRestaurantFixtures = [...restaurantFixtures];

beforeEach(() => {
  originalRestaurantFixtures = [...restaurantFixtures];
  jest.clearAllMocks();
});

describe("Given the getRestaurants method of RestaurantController", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Pick<Response, "status" | "json">;

  describe("When it receives a request", () => {
    const req = {
      query: { page: "" },
    } as Pick<Request, "query">;

    const restaurantModel: Pick<
      Model<RestaurantStructure>,
      "find" | "countDocuments"
    > = {
      find: jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              exec: jest
                .fn()
                .mockResolvedValue(
                  originalRestaurantFixtures
                    .sort((restaurantA, restaurantB) =>
                      restaurantA.name
                        .toLowerCase()
                        .localeCompare(restaurantB.name.toLowerCase()),
                    )
                    .slice(0, 5),
                ),
            }),
          }),
        }),
      }),
      countDocuments: jest
        .fn()
        .mockResolvedValue(originalRestaurantFixtures.length),
    };

    test("Then it should call the response's method status with 200", async () => {
      const restaurantController = new RestaurantController(
        restaurantModel as Model<RestaurantStructure>,
      );

      await restaurantController.getRestaurants(
        req as RestaurantRequest,
        res as Response,
      );

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("Then it should call the response's method json with 5 restaurants alphabetically ordered", async () => {
      const expectedRestaurants = restaurantFixtures
        .sort((restaurantA, restaurantB) =>
          restaurantA.name
            .toLowerCase()
            .localeCompare(restaurantB.name.toLowerCase()),
        )
        .slice(0, 5);

      const restaurantController = new RestaurantController(
        restaurantModel as Model<RestaurantStructure>,
      );

      await restaurantController.getRestaurants(
        req as RestaurantRequest,
        res as Response,
      );

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ restaurants: expectedRestaurants }),
      );
    });

    test("Then it should call the response's method json with 6 as a total number of restaurants", async () => {
      const expectedRestaurantsTotal = restaurantFixtures.length;

      const restaurantController = new RestaurantController(
        restaurantModel as Model<RestaurantStructure>,
      );

      await restaurantController.getRestaurants(
        req as RestaurantRequest,
        res as Response,
      );

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ restaurantsTotal: expectedRestaurantsTotal }),
      );
    });
  });

  describe("When it receives a request with page 2", () => {
    const pageNumber = 2;

    const req = {
      query: { page: pageNumber.toString() },
    } as Pick<Request, "query">;

    const postModel: Pick<
      Model<RestaurantStructure>,
      "find" | "countDocuments"
    > = {
      find: jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              exec: jest
                .fn()
                .mockResolvedValue(
                  originalRestaurantFixtures
                    .sort((restaurantA, restaurantB) =>
                      restaurantA.name
                        .toLowerCase()
                        .localeCompare(restaurantB.name.toLowerCase()),
                    )
                    .slice(5, 10),
                ),
            }),
          }),
        }),
      }),
      countDocuments: jest
        .fn()
        .mockResolvedValue(originalRestaurantFixtures.length),
    };
    test("Then it should call the response's method json with Monk's Café", async () => {
      const expectedRestaurantsPage2 = originalRestaurantFixtures
        .sort((restaurantA, restaurantB) =>
          restaurantA.name
            .toLowerCase()
            .localeCompare(restaurantB.name.toLowerCase()),
        )
        .slice(5, 10);

      const restaurantController = new RestaurantController(
        postModel as Model<RestaurantStructure>,
      );

      await restaurantController.getRestaurants(
        req as RestaurantRequest,
        res as Response,
      );

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ restaurants: expectedRestaurantsPage2 }),
      );
    });
  });
});
