import { NextFunction, Request, Response } from "express";
import RestaurantStructure from "../types.js";

export interface RestaurantControllerStructure {
  getRestaurants: (
    req: RestaurantRequest,
    res: RestaurantsResponse,
  ) => Promise<void>;

  toggleRestaurantById: (
    req: RestaurantRequest,
    res: ToggledRestaurantResponse,
    next: NextFunction,
  ) => Promise<void>;
}

export type RestaurantRequest = Request<
  RestaurantParams,
  Record<string, unknown>,
  Record<string, unknown>,
  RestaurantQuery
>;

export type RestaurantQuery = {
  page: string;
};

export type RestaurantParams = {
  restaurantId: string;
};

export type RestaurantsResponse = Response<GetRestaurantsResBody>;

export type GetRestaurantsResBody = {
  restaurants: RestaurantStructure[];
  restaurantsTotal: number;
};

export type ToggledRestaurantResponse = Response<ToggleRestaurantResBody>;

export type ToggleRestaurantResBody = {
  restaurant: RestaurantStructure;
};
