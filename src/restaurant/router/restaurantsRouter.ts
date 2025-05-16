import { Router } from "express";
import RestaurantController from "../controller/RestaurantController.js";
import Restaurant from "../model/Restaurant.js";
import handleIdValidation from "../../server/middlewares/handleIdValidation/handleIdValidation.js";

const restaurantsRouter = Router();

const restaurantController = new RestaurantController(Restaurant);

restaurantsRouter.get("/", restaurantController.getRestaurants);

restaurantsRouter.patch(
  "/visit-restaurant/:restaurantId",
  handleIdValidation,
  restaurantController.toggleRestaurantById,
);

export default restaurantsRouter;
