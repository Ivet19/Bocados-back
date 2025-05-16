import { NextFunction, Request, Response } from "express";
import RestaurantStructure from "../types.js";

export interface RestaurantControllerStructure {
  getRestaurants: (
    req: RestaurantRequest,
    res: RestaurantsResponse,
  ) => Promise<void>;

  toggleRestaurantById: (
    req: RestaurantRequest,
    res: RestaurantResponse,
    next: NextFunction,
  ) => Promise<void>;
}

export type RestaurantRequest = Request<
  RestaurantParams,
  Record<string, unknown>,
  ReqBodyRestaurantData,
  RestaurantQuery
>;

export type RestaurantQuery = {
  page: string;
};

export type RestaurantParams = {
  restaurantId: string;
};

export type ReqBodyRestaurantData = Omit<
  RestaurantStructure,
  "_id" | "visitDate"
> & {
  visitDate?: string;
};

export type RestaurantsResponse = Response<GetRestaurantsResBody>;

export type GetRestaurantsResBody = {
  restaurants: RestaurantStructure[];
  restaurantsTotal: number;
};

export type RestaurantResponse = Response<RestaurantResBody>;

export type RestaurantResBody = {
  restaurant: RestaurantStructure;
};
