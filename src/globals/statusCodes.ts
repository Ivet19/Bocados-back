import { StatusCodes } from "./types.js";

const statusCodes = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
} satisfies StatusCodes;

export default statusCodes;
