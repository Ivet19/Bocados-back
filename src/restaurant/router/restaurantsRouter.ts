import { Router } from "express";
import RestaurantController from "../controller/RestaurantController.js";
import Restaurant from "../model/Restaurant.js";

const restaurantsRouter = Router();

const restaurantController = new RestaurantController(Restaurant);

restaurantsRouter.patch(
  "/visit-restaurant/:restaurantId",
  restaurantController.toggleRestaurantById,
);

restaurantsRouter.get("/", restaurantController.getRestaurants);

export default restaurantsRouter;
