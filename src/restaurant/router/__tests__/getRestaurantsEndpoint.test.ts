import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase.js";
import mongoose from "mongoose";
import request from "supertest";
import { losPollosHermanos, monksCafe } from "../../fixtures.js";
import Restaurant from "../../model/Restaurant.js";
import app from "../../../server/app.js";
import { ResBody } from "../../controller/types.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoBdConnectionString = server.getUri();

  await connectToDatabase(mongoBdConnectionString);
});

afterAll(async () => {
  mongoose.disconnect();
  await server.stop();
});

describe("Given the GET/restaurants endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 200 status code and Los Pollos Hermanos and Monk's Cafe restaurants", async () => {
      await Restaurant.create(losPollosHermanos, monksCafe);

      const response = await request(app).get("/restaurants");
      const body = response.body as ResBody;

      expect(response.status).toBe(200);
      expect(body.restaurants).toContainEqual(
        expect.objectContaining({
          name: "Los Pollos Hermanos",
        }),
      );
      expect(body.restaurants).toContainEqual(
        expect.objectContaining({
          name: "Monk's Cafe",
        }),
      );
      expect(body.restaurantsTotal).toBe(2);
    });
  });
});
