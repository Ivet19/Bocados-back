import { Request, Response } from "express";
import RestaurantStructure from "../types.js";

export interface RestaurantControllerStructure {
  getRestaurants: (req: RestaurantRequest, res: Response) => Promise<void>;
}

export type RestaurantRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>,
  RestaurantQuery
>;

export type RestaurantQuery = {
  page: string;
};

export type RestaurantResponse = Response<ResBody>;

export type ResBody = {
  restaurants: RestaurantStructure[];
  restaurantsTotal: number;
};
