import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import mongoose from "mongoose";
import Restaurant from "../../model/Restaurant.js";
import app from "../../../server/app.js";
import { RestaurantResBody } from "../../controller/types.js";
import { centralPerk, losPollosHermanos } from "../../fixtures.js";

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

describe("Given the GET/restaurants/:restaurantId endpoint", () => {
  describe("When it receives a request with /restaurants/663b7989f2a43e9f4c5c0a01", () => {
    test("Then it should respond with a 200 status code and Los Pollos Hermanos restaurant", async () => {
      await Restaurant.create(losPollosHermanos, centralPerk);

      const response = await request(app).get(
        "/restaurants/663b7989f2a43e9f4c5c0a01",
      );
      const body = response.body as RestaurantResBody;

      expect(response.status).toBe(200);
      expect(body.restaurant).toEqual(
        expect.objectContaining({
          name: "Los Pollos Hermanos",
        }),
      );
    });
  });

  describe("When it receives a request with /restaurants/000abc invalid and non existent id", () => {
    test("Then it should respond with a 400 status code and a 'Not valid id' error message", async () => {
      await Restaurant.create(losPollosHermanos, centralPerk);

      const response = await request(app).get("/restaurants/000abc");
      const body = response.body as { error: string };

      expect(response.status).toBe(400);
      expect(body.error).toBe("Not valid id");
    });
  });

  describe("When it receives a request with /restaurants/573561324567825367892345 non existent id", () => {
    test("Then it should respond with a 404 status code and a 'Restaurant not found' error message", async () => {
      await Restaurant.create(losPollosHermanos, centralPerk);

      const response = await request(app).get(
        "/restaurants/573561324567825367892345",
      );
      const body = response.body as { error: string };

      expect(response.status).toBe(404);
      expect(body.error).toBe("Restaurant not found");
    });
  });
});
