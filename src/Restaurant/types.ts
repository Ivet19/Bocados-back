export interface RestaurantStructure {
  _id: string;
  name: string;
  adress: string;
  foodType: string;
  imageUrl: string;
  description: string;
  isVisited: boolean;
  servingsAmount?: string;
  waitTime: string;
  customerService: string;
  priceCategory: string;
  rating: 5;
  visitDate: Date;
}
