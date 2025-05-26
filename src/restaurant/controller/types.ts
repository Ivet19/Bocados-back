import { NextFunction, Request, Response } from "express";
import RestaurantStructure from "../types.js";

export interface RestaurantControllerStructure {
  getRestaurants: (
    req: RestaurantRequest,
    res: RestaurantsResponse,
  ) => Promise<void>;
  getRestaurantById: (
    req: RestaurantRequest,
    res: RestaurantResponse,
    next: NextFunction,
  ) => Promise<void>;
  toggleRestaurantById: (
    req: RestaurantRequest,
    res: RestaurantResponse,
    next: NextFunction,
  ) => Promise<void>;
  updateRestaurant: (
    req: ModifiedRestaurantRequest,
    res: RestaurantResponse,
    next: NextFunction,
  ) => Promise<void>;
  addRestaurant: (
    req: RestaurantRequest,
    res: RestaurantResponse,
    next: NextFunction,
  ) => Promise<void>;
  deleteRestaurant: (
    req: RestaurantRequest,
    res: RestaurantResponse,
    next: NextFunction,
  ) => Promise<void>;
}

export type RestaurantRequest = Request<
  RestaurantParams,
  Record<string, unknown>,
  RequestBodyRestaurantData,
  RestaurantQuery
>;

export type ModifiedRestaurantRequest = Request<
  RestaurantParams,
  Record<string, unknown>,
  RequestBodyModifiedRestaurant,
  RestaurantQuery
>;

export type IdRequest = Request<RestaurantParams>;

export type RestaurantQuery = {
  page: string;
};

export type RestaurantParams = {
  restaurantId: string;
};

export type RequestBodyRestaurantData = Omit<
  RestaurantStructure,
  "_id" | "visitDate"
> & {
  visitDate?: string;
};

export type RequestBodyModifiedRestaurant = { restaurant: ModifiedRestaurant };

export type ModifiedRestaurant = Omit<
  RestaurantStructure,
  "_id" | "visitDate"
> & {
  id: string;
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
