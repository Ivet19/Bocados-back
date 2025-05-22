import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from "mongoose";
import connectToDatabase from "../../../database/connectToDatabase.js";
import app from "../../../server/app.js";
import Restaurant from "../../model/Restaurant.js";
import { krustyBurger, theLotusLantern } from "../../fixtures.js";
import { RestaurantResBody } from "../../controller/types.js";
import statusCodes from "../../../globals/statusCodes.js";

let server: MongoMemoryServer;

beforeEach(async () => {
  server = await MongoMemoryServer.create();
  const mongoBdConnectionString = server.getUri();

  await connectToDatabase(mongoBdConnectionString);
});

afterEach(async () => {
  mongoose.disconnect();
  await server.stop();
});

describe("Given the DELETE/restaurants/123456789123456789123454 endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 200 status code and The Lotus Lantern restaurant", async () => {
      await Restaurant.create(theLotusLantern, krustyBurger);

      const response = await request(app).delete(
        `/restaurants/${theLotusLantern._id}`,
      );
      const body = response.body as RestaurantResBody;

      expect(response.status).toBe(statusCodes.OK);
      expect(body.restaurant).toEqual(
        expect.objectContaining({
          _id: theLotusLantern._id,
          name: "The Lotus Lantern",
        }),
      );

      const dataBaseRestaurants = await Restaurant.find();
      expect(dataBaseRestaurants).toHaveLength(1);
    });
  });
});

describe("Given the DELETE/restaurants/573561324567825367892345 non existing restaurant id endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 404 status code and a 'Restaurant not found' error message", async () => {
      await Restaurant.create(theLotusLantern, krustyBurger);

      const response = await request(app).delete(
        "/restaurants/573561324567825367892345",
      );
      const body = response.body as { error: string };

      expect(response.status).toBe(statusCodes.NOT_FOUND);
      expect(body.error).toBe("Restaurant not found");
    });
  });
});
