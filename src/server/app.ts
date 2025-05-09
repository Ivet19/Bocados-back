import express from "express";
import morgan from "morgan";
import handleHealthCheckStatus from "./middlewares/handleHealthCheckStatus/handleHealthCheckStatus.js";
import handleErrors from "./middlewares/handleErrors/handleErrors.js";
import handleEndpointNotFound from "./middlewares/handleEndpointNotFound/handleEndpointNotFound.js";
import { RestaurantController } from "../restaurant/controller/RestaurantController.js";
import Restaurant from "../restaurant/model/Restaurant.js";

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.get("/", handleHealthCheckStatus);

const controller = new RestaurantController(Restaurant);

app.get("/restaurants", controller.getRestaurants);

app.use(handleEndpointNotFound);

app.use(handleErrors);

export default app;
