import request from "supertest";
import app from "../app.js";
import statusCodes from "../../globals/statusCodes.js";

describe("Given the GET/potato non existent endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 404 status code and a 'Endpoint not found' message", async () => {
      const response = await request(app).get("/potato");

      const body = response.body as { error: string };

      expect(response.status).toBe(statusCodes.NOT_FOUND);
      expect(body.error).toBe("Endpoint not found");
    });
  });
});
