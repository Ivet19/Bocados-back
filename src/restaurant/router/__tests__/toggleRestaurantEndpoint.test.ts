import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from "mongoose";
import connectToDatabase from "../../../database/connectToDatabase.js";
import app from "../../../server/app.js";
import statusCodes from "../../../globals/statusCodes.js";
import Restaurant from "../../model/Restaurant.js";
import { notVisitedKrustyBurger } from "../../fixtures.js";
import { ToggleRestaurantResBody } from "../../controller/types.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoDbConnectionString = server.getUri();

  await connectToDatabase(mongoDbConnectionString);
});

afterAll(async () => {
  mongoose.disconnect();
  await server.stop();
});

describe("Given the PATCH /restaurants/visit-restaurant/:restaurantId endpoint", () => {
  describe("When it receives a request with not visited restaurant Krusty Burger id", () => {
    test("Then it should respond with a 200 status code and Krusty Burger as visited", async () => {
      const expectedRestauarntName = "Krusty Burger";

      const notVisitedRestaurant = await Restaurant.create(
        notVisitedKrustyBurger,
      );

      expect(notVisitedRestaurant.isVisited).toBe(false);

      const id = notVisitedKrustyBurger._id;

      const response = await request(app).patch(
        `/restaurants/visit-restaurant/${id}`,
      );

      const body = response.body as ToggleRestaurantResBody;

      expect(response.status).toBe(statusCodes.OK);

      expect(body.restaurant.name).toBe(expectedRestauarntName);
      expect(body.restaurant.isVisited).toBe(true);
    });
  });

  describe("When it receives a request with 66436f7b9c0e9b2a1f7d88c3 id that doesn't exist", () => {
    test("Then it should respond with a 404 code and 'This restaurant doesn't exist' message", async () => {
      const expectedError = "This restaurant doesn't exist";

      const nonExistentId = "66436f7b9c0e9b2a1f7d88c3";

      const response = await request(app).patch(
        `/restaurants/visit-restaurant/${nonExistentId}`,
      );

      const body = response.body as { error: string };

      expect(response.status).toBe(statusCodes.NOT_FOUND);
      expect(body).toStrictEqual({ error: expectedError });
    });
  });
});
