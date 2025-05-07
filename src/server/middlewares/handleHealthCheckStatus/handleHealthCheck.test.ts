import { Request, Response } from "express";
import handleHealthCheckStatus from "./handleHealthCheckStatus.js";
import statusCodes from "../../../globals/statusCodes.js";

describe("Given the handleHealthCheckStatus middleware", () => {
  describe("When it receives a response", () => {
    const req = {} as Request;
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("Then it should call the received response's method status with 200", () => {
      const expectedStatus = statusCodes.OK;

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
