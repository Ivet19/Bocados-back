interface RestaurantStructure {
  _id: string;
  name: string;
  adress: string;
  foodType: string;
  imageUrl: string;
  description: string;
  isVisited: boolean;
  servingsAmount?: ServingsAmmount;
  waitTime?: WaitTime;
  customerService?: CustomerService;
  priceCategory?: PriceCategory;
  rating?: 5;
  visitDate: Date;
}

type ServingsAmmount = "Poca" | "Normal" | "Generosa";

type WaitTime = "Poco" | "Normal" | "Mucho";

type CustomerService = "Muy malo" | "Malo" | "Regular" | "Bueno" | "Muy bueno'";

type PriceCategory = "Bajo" | "Medio" | "Alto";

export default RestaurantStructure;
