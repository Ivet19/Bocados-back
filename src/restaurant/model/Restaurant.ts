import { model, Schema } from "mongoose";
import RestaurantStructure from "../types.js";

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
    enum: ["Poca", "Normal", "Generosa"],
  },
  waitTime: {
    type: String,
    enum: ["Poco", "Normal", "Mucho"],
  },
  customerService: {
    type: String,
    enum: ["Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"],
  },
  priceCategory: {
    type: String,
    enum: ["Bajo", "Medio", "Alto"],
  },
  rating: {
    type: Number,
  },
  visitDate: {
    type: Date,
  },
});

const Restaurant = model("Restaurant", restaurantSchema, "restaurants");

export default Restaurant;
