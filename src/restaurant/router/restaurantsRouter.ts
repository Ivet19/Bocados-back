import { Router } from "express";
import RestaurantController from "../controller/RestaurantController.js";
import Restaurant from "../model/Restaurant.js";
import handleIdValidation from "../../server/middlewares/handleIdValidation/handleIdValidation.js";

const restaurantsRouter = Router();

const restaurantController = new RestaurantController(Restaurant);

restaurantsRouter.get("/", restaurantController.getRestaurants);

restaurantsRouter.get(
  "/:restaurantId",
  handleIdValidation,
  restaurantController.getRestaurantById,
);

restaurantsRouter.patch(
  "/visit-restaurant/:restaurantId",
  handleIdValidation,
  restaurantController.toggleRestaurantById,
);

restaurantsRouter.post("/", restaurantController.addRestaurant);

restaurantsRouter.delete(
  "/:restaurantId",
  handleIdValidation,
  restaurantController.deleteRestaurant,
);

export default restaurantsRouter;
