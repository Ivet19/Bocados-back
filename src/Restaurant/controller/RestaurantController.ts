import { Model } from "mongoose";
import {
  RestaurantControllerStructure,
  RestaurantRequest,
  RestaurantResponse,
} from "./types.js";
import statusCodes from "../../globals/statusCodes.js";
import RestaurantStructure from "../types.js";

class RestaurantController implements RestaurantControllerStructure {
  constructor(private postModel: Model<RestaurantStructure>) {}

  public getRestaurants = async (
    req: RestaurantRequest,
    res: RestaurantResponse,
  ): Promise<void> => {
    let page = req.query.page;

    if (!page) {
      page = "1";
    }

    const restaurantsTotal = await this.postModel.countDocuments();

    const restaurants = await this.postModel
      .find()
      .sort({ name: "asc" })
      .skip((Number(page) - 1) * 5)
      .limit(5)
      .exec();

    res
      .status(statusCodes.OK)
      .json({ restaurants: restaurants, restaurantsTotal: restaurantsTotal });
  };
}

export default RestaurantController;
