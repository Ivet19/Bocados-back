import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase.js";
import mongoose from "mongoose";
import request from "supertest";
import Restaurant from "../../model/Restaurant.js";
import { theLotusLantern, theLotusLanternData } from "../../fixtures.js";
import app from "../../../server/app.js";
import { RestaurantResBody } from "../../controller/types.js";
import statusCodes from "../../../globals/statusCodes.js";

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

describe("Given the PUT /modify-restaurant/:restaurantId endpoint", () => {
  describe("When it receives a request with X restaurant data and id", () => {
    test("Then it should respond with a 200 status code and X updated restaurant", async () => {
      const expectedRestaurantName = "The Lotus Lantern";

      const restaurant = await Restaurant.create(theLotusLantern);

      const restaurantId = restaurant.id;

      const response = await request(app)
        .put(`/restaurants/modify-restaurant/${restaurantId}`)
        .send(theLotusLanternData);

      const body = response.body as RestaurantResBody;

      expect(response.status).toBe(statusCodes.OK);
      expect(body.restaurant).toMatchObject({ name: expectedRestaurantName });
    });
  });

  describe("When it receives a request with a restaurant id that doesn't exist in the database", () => {
    test("Then it should respond with a 404 status code and a 'This restaurant doesn't exist' error message", async () => {
      const response = await request(app).put(
        `/restaurants/modify-restaurant/123456789012345678912345`,
      );

      const body = response.body as { error: string };

      expect(response.status).toBe(statusCodes.NOT_FOUND);
      expect(body.error).toBe("This restaurant doesn't exist");
    });
  });
});
