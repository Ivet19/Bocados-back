import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from "mongoose";
import connectToDatabase from "../../../database/connectToDatabase.js";
import Restaurant from "../../model/Restaurant.js";
import {
  jjsDinner,
  losPollosHermanos,
  souvlakiExpressData,
  theLotusLantern,
  theLotusLanternData,
} from "../../fixtures.js";
import { RestaurantResBody } from "../../controller/types.js";
import app from "../../../server/app.js";
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

describe("Given the POST/posts endpoint", () => {
  describe("When it receives a request with Souvlaki Express restaurant data", () => {
    test("Then it should respond with a 201 status code and Souvlaki Express restaurant", async () => {
      await Restaurant.create(losPollosHermanos, jjsDinner);

      const newRestaurant = souvlakiExpressData;

      const response = await request(app)
        .post("/restaurants")
        .send(newRestaurant);
      const body = response.body as RestaurantResBody;

      expect(response.status).toBe(201);
      expect(body.restaurant).toEqual(
        expect.objectContaining({
          name: newRestaurant.name,
        }),
      );

      const dataBaseRestaurants = await Restaurant.find();
      expect(dataBaseRestaurants).toHaveLength(3);
    });
  });

  describe("When it receives a request with already existing The Lotus Lantern restaurant data", () => {
    test("Then it should respond with a 409 status code and 'Restaurant already exists' error message", async () => {
      await Restaurant.create(theLotusLantern, jjsDinner);

      const newRestaurant = theLotusLanternData;

      const response = await request(app)
        .post("/restaurants")
        .send(newRestaurant);

      const body = response.body as { error: string };

      expect(response.status).toBe(statusCodes.CONFLICT);
      expect(body.error).toBe("Restaurant already exists");

      const dataBaseRestaurants = await Restaurant.find();
      expect(dataBaseRestaurants).toHaveLength(2);
    });
  });
});
