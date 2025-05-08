import { model, Schema } from "mongoose";
import { RestaurantStructure } from "../types.js";

const restaurantSchema = new Schema<RestaurantStructure>({
  name: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  foodType: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isVisited: {
    type: Boolean,
    required: true,
  },
  servingsAmount: {
    type: String,
  },
  waitTime: {
    type: String,
  },
  customerService: {
    type: String,
  },
  priceCategory: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

const Restaurant = model("Restaurant", restaurantSchema, "restaurants");

export default Restaurant;
