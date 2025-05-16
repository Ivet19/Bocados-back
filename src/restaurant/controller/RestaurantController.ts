import { Model } from "mongoose";
import { NextFunction } from "express";
import {
  RestaurantControllerStructure,
  RestaurantRequest,
  RestaurantsResponse,
  RestaurantResponse,
} from "./types.js";
import statusCodes from "../../globals/statusCodes.js";
import RestaurantStructure from "../types.js";
import ServerError from "../../server/ServerError/ServerError.js";

class RestaurantController implements RestaurantControllerStructure {
  constructor(private readonly restaurantModel: Model<RestaurantStructure>) {}

  public getRestaurants = async (
    req: RestaurantRequest,
    res: RestaurantsResponse,
  ): Promise<void> => {
    let { page } = req.query;

    if (!page) {
      page = "1";
    }

    const restaurantsTotal = await this.restaurantModel.countDocuments();

    const restaurants = await this.restaurantModel
      .find()
      .sort({ name: "asc" })
      .skip((Number(page) - 1) * 5)
      .limit(5)
      .exec();

    res
      .status(statusCodes.OK)
      .json({ restaurants: restaurants, restaurantsTotal: restaurantsTotal });
  };

  public toggleRestaurantById = async (
    req: RestaurantRequest,
    res: RestaurantResponse,
    next: NextFunction,
  ): Promise<void> => {
    const { restaurantId } = req.params;

    const restaurant = await this.restaurantModel.findById(restaurantId).exec();

    if (!restaurant) {
      const error = new ServerError(
        statusCodes.NOT_FOUND,
        "This restaurant doesn't exist",
      );

      next(error);

      return;
    }

    const updatedRestaurant = await this.restaurantModel
      .findByIdAndUpdate(
        restaurantId,
        { isVisited: !restaurant.isVisited },
        { new: true },
      )
      .exec();

    res.status(statusCodes.OK).json({ restaurant: updatedRestaurant! });
  };

  public addRestaurant = async (
    req: RestaurantRequest,
    res: RestaurantResponse,
    next: NextFunction,
  ): Promise<void> => {
    const newRestaurantData = req.body;

    const restaurants = await this.restaurantModel.find().exec();

    if (
      restaurants.some(
        (restaurant) =>
          restaurant.name.toLowerCase() ===
          newRestaurantData.name.toLowerCase(),
      )
    ) {
      const error = new ServerError(
        statusCodes.CONFLICT,
        "Restaurant already exists",
      );

      next(error);

      return;
    }

    const addedRestaurant =
      await this.restaurantModel.insertOne(newRestaurantData);

    res.status(statusCodes.CREATED).json({ restaurant: addedRestaurant });
  };
}

export default RestaurantController;
