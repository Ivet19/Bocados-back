import RestaurantStructure from "./types.js";

export const losPollosHermanos: RestaurantStructure = {
  _id: "663b7989f2a43e9f4c5c0a01",
  name: "Los Pollos Hermanos",
  adress: "Albuquerque, New Mexico",
  foodType: "Pollos fritos / Fast food",
  imageUrl: "https://example.com/los-pollos.jpg",
  description:
    "Famoso por su pollo crujiente y limpio ambiente familiar. Ideal para quienes valoran la eficiencia y la precisión... en todos los sentidos.",
  isVisited: true,
  servingsAmount: "Generosa",
  waitTime: "Poco",
  customerService: "Muy bueno",
  priceCategory: "Medio",
  rating: 4.2,
  visitDate: new Date("2023-05-12"),
};

export const notVisitedLosPollosHermanos: RestaurantStructure = {
  _id: "663b7989f2a43e9f4c5c0a01",
  name: "Los Pollos Hermanos",
  adress: "Albuquerque, New Mexico",
  foodType: "Pollos fritos / Fast food",
  imageUrl: "https://example.com/los-pollos.jpg",
  description:
    "Famoso por su pollo crujiente y limpio ambiente familiar. Ideal para quienes valoran la eficiencia y la precisión... en todos los sentidos.",
  isVisited: false,
  servingsAmount: "Generosa",
  waitTime: "Poco",
  customerService: "Muy bueno",
  priceCategory: "Medio",
  rating: 4.2,
  visitDate: new Date("2023-05-12"),
};

export const monksCafe: RestaurantStructure = {
  _id: "663b7989f2a43e9f4c5c0a02",
  name: "Monk's Cafe",
  adress: "West 112th Street, Nueva York",
  foodType: "Diner Americano",
  imageUrl: "https://example.com/monks-cafe.jpg",
  description:
    "Punto de encuentro habitual de un grupo muy particular de amigos. Café sencillo, comida básica, ambiente acogedor.",
  isVisited: false,
};

export const centralPerk: RestaurantStructure = {
  _id: "663b7989f2a43e9f4c5c0a03",
  name: "Central Perk",
  adress: "Greenwich Village, Nueva York",
  foodType: "Café y pastelería",
  imageUrl: "https://example.com/central-perk.jpg",
  description:
    "Más que un café: un lugar para contar tus problemas mientras bebes un espresso XL en el mismo sofá de siempre.",
  isVisited: true,
  servingsAmount: "Poca",
  waitTime: "Normal",
  customerService: "Bueno",
  priceCategory: "Medio",
  rating: 3.9,
  visitDate: new Date("2023-03-17"),
};

export const jjsDinner: RestaurantStructure = {
  _id: "663b7989f2a43e9f4c5c0a04",
  name: "JJ's Diner",
  adress: "Pawnee, Indiana",
  foodType: "Desayunos",
  imageUrl: "https://example.com/jjs-diner.jpg",
  description:
    "Los mejores waffles del mundo según Leslie Knope. Y eso no es poca cosa.",
  isVisited: true,
  servingsAmount: "Generosa",
  waitTime: "Poco",
  customerService: "Muy bueno",
  priceCategory: "Bajo",
  rating: 4.3,
  visitDate: new Date("2022-11-09"),
};

export const freddysBbq: RestaurantStructure = {
  _id: "663b7989f2a43e9f4c5c0a05",
  name: "Freddy's BBQ Joint",
  adress: "Washington D.C.",
  foodType: "Barbacoa",
  imageUrl: "https://example.com/freddys-bbq.jpg",
  description:
    "Un lugar discreto para comer costillas con las manos... incluso si eres el presidente.",
  isVisited: true,
  servingsAmount: "Generosa",
  waitTime: "Normal",
  customerService: "Bueno",
  priceCategory: "Medio",
  rating: 4,
  visitDate: new Date("2023-06-30"),
};

export const bobsBurgers: RestaurantStructure = {
  _id: "663b7989f2a43e9f4c5c0a06",
  name: "Bob's Burgers",
  adress: "Ocean Avenue, USA",
  foodType: "Hamburguesas",
  imageUrl: "https://example.com/bobs-burgers.jpg",
  description:
    "Restaurante familiar con un dueño muy excéntrico y recetas semanales únicas. Las hamburguesas son tan buenas como raras.",
  isVisited: false,
};

export const visitedBobsBurgers: RestaurantStructure = {
  _id: "663b7989f2a43e9f4c5c0a06",
  name: "Bob's Burgers",
  adress: "Ocean Avenue, USA",
  foodType: "Hamburguesas",
  imageUrl: "https://example.com/bobs-burgers.jpg",
  description:
    "Restaurante familiar con un dueño muy excéntrico y recetas semanales únicas. Las hamburguesas son tan buenas como raras.",
  isVisited: true,
};

export const krustyBurger: RestaurantStructure = {
  _id: "664371df9c0e9b2a1f7d88c7",
  name: "Krusty Burger",
  adress: "Springfield, USA",
  foodType: "Comida rápida",
  imageUrl: "https://example.com/krusty-burger.jpg",
  description:
    "La hamburguesa preferida de Springfield. No esperes comida saludable, pero sí mucho sabor (y probablemente algo de sarcasmo).",
  isVisited: true,
  servingsAmount: "Generosa",
  waitTime: "Poco",
  customerService: "Regular",
  priceCategory: "Bajo",
  rating: 3.8,
  visitDate: new Date("2023-10-18"),
};

export const notVisitedKrustyBurger: RestaurantStructure = {
  _id: "664371df9c0e9b2a1f7d88c7",
  name: "Krusty Burger",
  adress: "Springfield, USA",
  foodType: "Comida rápida",
  imageUrl: "https://example.com/krusty-burger.jpg",
  description:
    "La hamburguesa preferida de Springfield. No esperes comida saludable, pero sí mucho sabor (y probablemente algo de sarcasmo).",
  isVisited: false,
  servingsAmount: "Generosa",
  waitTime: "Poco",
  customerService: "Regular",
  priceCategory: "Bajo",
  rating: 3.8,
  visitDate: new Date("2023-10-18"),
};

export const restaurantFixtures: RestaurantStructure[] = [
  losPollosHermanos,
  monksCafe,
  centralPerk,
  jjsDinner,
  freddysBbq,
  bobsBurgers,
];
