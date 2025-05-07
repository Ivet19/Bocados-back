import { Request, Response } from "express";
import handleHealthCheckStatus from "./handleHealthCheckStatus.js";

describe("Given the handleHealthCheckStatus middleware", () => {
  describe("When it receives a response", () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Pick<Response, "status" | "json">;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("Then it should call the received response's method status with 200", () => {
      const expectedStatus = 200;

      handleHealthCheckStatus(req, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the received response's method json with a message 'pong 🏓'", () => {
      const expectedMessage = { message: "pong 🏓" };

      handleHealthCheckStatus(req, res as Response);

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
