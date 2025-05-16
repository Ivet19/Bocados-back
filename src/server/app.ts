import express from "express";
import morgan from "morgan";
import handleHealthCheckStatus from "./middlewares/handleHealthCheckStatus/handleHealthCheckStatus.js";
import handleErrors from "./middlewares/handleErrors/handleErrors.js";
import handleEndpointNotFound from "./middlewares/handleEndpointNotFound/handleEndpointNotFound.js";
import restaurantsRouter from "../restaurant/router/restaurantsRouter.js";
import handleCorsAllowedOrigins from "./middlewares/handleCorsAllowedOrigins/handleCorsAllowedOrigins.js";

const app = express();

app.use(handleCorsAllowedOrigins);

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.get("/", handleHealthCheckStatus);

app.use("/restaurants", restaurantsRouter);

app.use(handleEndpointNotFound);

app.use(handleErrors);

export default app;
